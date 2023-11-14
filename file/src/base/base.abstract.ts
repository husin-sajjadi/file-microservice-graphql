import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseAbstract {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @CreateDateColumn({ nullable: true })
  created: Date;

  @Field()
  @UpdateDateColumn({ nullable: true })
  @Exclude()
  updated: Date;
}
