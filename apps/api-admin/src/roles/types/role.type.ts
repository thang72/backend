import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Node } from '@ssc/contracts';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Role extends Node {
  @Field()
  name: string;

  @Field()
  normalizedName!: string;
}
