import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { UploadFileInput } from './dto/file.dto';
import { File } from './entity/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { existsSync, mkdirSync } from 'fs';
import * as fs from 'fs';
import { join } from 'path';
import { fileConfig } from './base/file.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  async onModuleInit() {
    try {
      if (!existsSync(fileConfig.dest)) {
        mkdirSync(fileConfig.dest);
      }
    } catch (e) {}
  }

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async findAll() {
    return await this.fileRepository.find();
  }

  async findOne(id: string) {
    return await this.fileRepository.findOneOrFail({
      where: { id },
    });
  }

  async create(uploadFileInput: UploadFileInput) {
    const slug = await this.uploadFileBase64(uploadFileInput);
    uploadFileInput.slug = slug;
    const newFile: File = await this.fileRepository.create(uploadFileInput);
    return await this.fileRepository.save(newFile);
  }

  public async uploadFileBase64(uploadFileDto: UploadFileInput) {
    if (
      !uploadFileDto.mimetype.match(
        /\/(jpg|jpeg|png|mpeg|mp4|3gp|aac|mp3|ogg|wav|zip|doc|docx|pdf|officedocument|msword|txt|svg)$/,
      )
    ) {
      throw new BadRequestException('Unsupported file');
    }

    const matches = uploadFileDto.base64.match(
      /^data:([A-Za-z-+/]+);base64,(.+)$/,
    );
    const response = { type: null, data: null };
    if (matches == null || matches.length !== 3) {
      throw new BadRequestException('File is destroyed');
    }
    response.data = Buffer.from(matches[2], 'base64');
    try {
      const uploadPath =
        fileConfig.dest + '/' + uploadFileDto.mimetype.split('/')[0];
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      const fileName = `${uuidv4()}.${uploadFileDto.extension}`;
      fs.writeFileSync(join(uploadPath, fileName), response.data, 'utf8');
      return fileName;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getFilePath(slug: string): Promise<string> {
    const file = await this.fileRepository.findOne({
      where: { slug },
    });
    if (file) {
      const filePath = join(
          //global['appRoot'],
          fileConfig.dest,
          file.mimetype.split('/')[0],
          slug,
      );
      if (!existsSync(filePath)) {
        throw new NotFoundException("File not found");
      } else {
        return filePath;
      }
    } else {
      throw new NotFoundException("File not found");
    }
  }
}
