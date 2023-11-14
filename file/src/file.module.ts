import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { File } from './entity/file.entity';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { JwtService } from '@nestjs/jwt';
import {FileController} from "./file.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([File]),
  ],
  controllers :[FileController],
  providers: [FileResolver, FileService, JwtService],
})
export class FileModule {}
