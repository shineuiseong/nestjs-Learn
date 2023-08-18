import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/users/repository/users.repository'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  async create(userDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.createUser(userDto)
    } catch (error) {
      console.log(error)
    }
  }
}
