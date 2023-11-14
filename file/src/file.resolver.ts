import {
  Resolver,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { File } from './entity/file.entity';
import { FileService } from './file.service';
import { UploadFileInput } from './dto/file.dto';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => File)
  uploadBase64(@Args('uploadFileInput') input: UploadFileInput) {
    return this.fileService.create(input);
  }

  @Query(() => [File], { name: 'files' })
  findAll() {
    return this.fileService.findAll();
  }

  @Query(() => File, { name: 'file' })
  findOne(@Args('id') id: string) {
    return this.fileService.findOne(id);
  }
}
