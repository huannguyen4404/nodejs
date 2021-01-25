import bcrypt from 'bcrypt'
import { IUser } from '../user.model'
import usersService from './users.service'

class AuthService {
  private static instance: AuthService

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async register(rawUserData: Record<string, unknown>) {
    return usersService.create(rawUserData)
  }

  async authenticate(userInfo: IUser, plainPassword: string): Promise<boolean> {
    try {
      const isMatched = await bcrypt.compare(plainPassword, userInfo.password)
      return isMatched ? true : false
    } catch (error) {
      throw new Error(`Authen failed: ${error.message}`)
    }
  }
}

export default AuthService.getInstance()
