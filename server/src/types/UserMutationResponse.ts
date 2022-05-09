import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/User";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({implements: IMutationResponse})
export class UserMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field()
  user?: User
}
