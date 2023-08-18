import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Not, Repository } from 'typeorm'
import { Token } from '@/token/entities/token.entity'
import { NullableType } from '@/utils/type/nullable.type'
import { FindOptions } from '@/utils/type/find-options.type'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>
  ) {}

  async create(data: DeepPartial<Token>): Promise<Token> {
    try {
      return await this.tokenRepository.save(this.tokenRepository.create(data))
    } catch (error) {
      console.log('Error creating token:', error)
      throw new InternalServerErrorException('Failed to create token')
    }
  }
  async findOne(options: FindOptions<Token>): Promise<NullableType<Token>> {
    try {
      return await this.tokenRepository.findOne({ where: options.where })
    } catch (error) {
      console.log('Error find token:', error)
      throw new InternalServerErrorException('Failed to find token')
    }
  }
  async findMany(options: FindOptions<Token>): Promise<Token[]> {
    try {
      return await this.tokenRepository.find({ where: options.where })
    } catch (error) {
      console.log('Error find tokens:', error)
      throw new InternalServerErrorException('Failed to find tokens')
    }
  }

  async delete({
    excludeId,
    ...criteria
  }: {
    id?: Token['id']
    user?: Pick<User, 'id'>
    excludeId?: Token['id']
  }): Promise<void> {
    await this.tokenRepository.softDelete({
      ...criteria,
      id: criteria.id ? criteria.id : excludeId ? Not(excludeId) : undefined
    })
  }
}
