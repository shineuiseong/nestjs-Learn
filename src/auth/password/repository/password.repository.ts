import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DataSource, DeepPartial, Repository } from 'typeorm'
import { Password } from '@/auth/password/entities/password.entity'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class PasswordRepository extends Repository<Password> {
  constructor(private dataSource: DataSource) {
    super(Password, dataSource.createEntityManager())
  }
  async createPassword(id: User['id'], hashPassword: string) {
    try {
      return await this.save({ password: hashPassword, user: id })
    } catch (error) {
      throw new InternalServerErrorException('Failed to create password')
    }
  }

  // 패스워드 조회
  async selectOneByUserId(id: User['id']) {
    try {
      return await this.findOne({ where: { user: id } })
    } catch (error) {
      console.log('Error finding password:', error)
      throw new InternalServerErrorException('Failed to find password')
    }
  }
  // 패스워드 업데이트
  async updatePassword(id: User['id'], payload: DeepPartial<Password>) {
    try {
      return await this.update({ user: id }, { ...payload })
    } catch (error) {
      console.log('Error updating password:', error)
      throw new InternalServerErrorException('Failed to update password')
    }
  }
}
