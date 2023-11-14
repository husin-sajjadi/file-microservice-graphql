import {
  Controller,
  Get,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { createReadStream } from 'fs';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get(':slug')
  async getFile(@Param('slug') slug: string): Promise<any> {
    const filePath = await this.fileService.getFilePath(slug);
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
}
