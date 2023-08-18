import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/users/entities/user.entity'
import { IsNotExist } from '@/utils/validators/isNotEmpty.validator'
import { IsExist } from '@/utils/validators/isEmpty.validator'
import { UsersRepository } from '@/users/repository/users.repository'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, IsNotExist, IsExist],
  exports: [UsersService]
})
export class UsersModule {}
