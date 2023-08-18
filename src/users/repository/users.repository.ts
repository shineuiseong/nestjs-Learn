import { DataSource, Repository, DeepPartial } from 'typeorm'
import { User } from '@/users/entities/user.entity'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { EntityWhere } from '@/utils/type/entity-where.type'
import { NullableType } from '@/utils/type/nullable.type'

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  // TODO: CREATE USER
  async createUser(createUser: CreateUserDto): Promise<User> {
    try {
      const user = this.create(createUser)
      return await this.save(user)
    } catch (error) {
      console.log('Error creating user:', error)
      throw new InternalServerErrorException('Failed to create user')
    }
  }

  // TODO: FIND USER ONE
  async findOneUser(fields: EntityWhere<User>): Promise<NullableType<User>> {
    try {
      return await this.findOne({ where: fields })
    } catch (error) {
      console.log('Error finding user:', error)
      throw new InternalServerErrorException('Failed to find user')
    }
  }

  // TODO: UPDATE USER DATA
  async updateUser(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    try {
      const updatedUser = this.create({ id, ...payload })
      return await this.save(updatedUser)
    } catch (error) {
      console.log('Error updating user:', error)
      throw new InternalServerErrorException('Failed to update user')
    }
  }

  // TODO: DELETE USER
  async deleteUser(id: User['id']): Promise<void> {
    try {
      await this.softDelete(id)
    } catch (error) {
      console.log('Error deleting user:', error)
      throw new InternalServerErrorException('Failed to delete user')
    }
  }
}
