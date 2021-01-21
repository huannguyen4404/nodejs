import bcrypt from 'bcrypt'
import { User } from './user.model'

class UsersService {
  private static instance: UsersService

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  async create(rawUserData: Record<string, unknown>) {
    try {
      const hashedPassword = await bcrypt.hash(rawUserData.password, 10)
      await User.create({
        username: rawUserData.username,
        password: hashedPassword,
      })
    } catch (error) {
      throw new Error(`create user failed: ${error.message}`)
    }
  }
}

export default UsersService.getInstance()
