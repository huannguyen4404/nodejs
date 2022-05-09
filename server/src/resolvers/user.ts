import argon2 from 'argon2';
import { UserMutationResponse } from "src/types/UserMutationResponse";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { RegisterInput } from "../types/RegisterInput";

@Resolver()
export class UserResolver {
  @Mutation(_return => UserMutationResponse)
  async register(
    @Arg('registerInput')
    registerInput: RegisterInput): Promise<UserMutationResponse> {
    const { username, password } = registerInput
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return {
        code: 400,
        success: false,
        message: 'Duplicated username',
      }
    }

    const hashedPwd = await argon2.hash(password)

    const newUser = User.create({
      username, 
      password: hashedPwd,
    })
    await newUser.save()

    return {
      code: 200,
      success: true,
      message: 'User registration successful',
      user: newUser,
    }
  }
}
