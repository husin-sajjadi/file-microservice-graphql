import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class UploadFileInput {
  @Field()
  base64?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  mimetype?: string;

  @Field({ nullable: true })
  size?: number;

  @Field()
  extension?: string;

  @Field({ nullable: true })
  fileCategory?: string;

  @Field({ nullable: true })
  ownerId?: string;
}
