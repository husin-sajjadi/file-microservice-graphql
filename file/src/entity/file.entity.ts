import { Column, Entity } from 'typeorm';
import { BaseAbstract } from '../base/base.abstract';
import { Field, ObjectType } from '@nestjs/graphql';
import {FileCategory} from "../base/file.enum";
@Entity()
@ObjectType()
export class File extends BaseAbstract {

  @Field({ nullable: true })
  @Column({ name: 'file_name' })
  name?: string;

  @Field({ nullable: true })
  @Column({ name: 'file_slug', nullable: true })
  slug?: string;

  @Field({ nullable: true })
  @Column({ name: 'file_mimetype', nullable: true })
  mimetype?: string;

  @Field({ nullable: true })
  @Column({ name: 'file_size', nullable: true })
  size?: number;

  @Field({ nullable: true })
  @Column({ name: 'file_extension', nullable: true })
  extension?: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    name: 'file_category',
    nullable: true,
    enum: FileCategory,
  })
  fileCategory?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ownerId?: string;
}
