import { Injectable } from '@nestjs/common'
import { PasswordRepository } from '@/auth/password/repository/password.repository'
import bcrypt from 'bcryptjs'
@Injectable()
export class PasswordService {
  constructor(private passwordRepository: PasswordRepository) {}
  async createPassword(id: number, password: string) {
    try {
      const hasPassword = await bcrypt.hash(password, 12)
      await this.passwordRepository.createPassword(id, hasPassword)
    } catch (error) {
      console.log(error)
    }
  }
  async comparePassword(id: number, password: string) {
    try {
      const getPassword = await this.passwordRepository.selectOneByUserId(id)
      return await bcrypt.compare(password, getPassword.password)
    } catch (error) {}
  }
}
