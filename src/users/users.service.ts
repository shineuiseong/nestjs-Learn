import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UsersRepository } from '@/users/repository/users.repository'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { User } from '@/users/entities/user.entity'
import { EntityWhere } from '@/utils/type/entity-where.type'
import { NullableType } from '@/utils/type/nullable.type'

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.createData(userDto)
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user')
    }
  }
  async findUser(fields: EntityWhere<User>): Promise<NullableType<User>> {
    try {
      return await this.userRepository.selectOne(fields)
    } catch (error) {
      console.log('Error finding user:', error)
      throw new InternalServerErrorException('Failed to find user')
    }
  }
}
