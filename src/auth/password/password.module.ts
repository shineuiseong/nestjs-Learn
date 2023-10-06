import { Module } from '@nestjs/common'
import { PasswordService } from './password.service'
import { PasswordController } from './password.controller'
import { IsNotExist } from '@/utils/validators/isNotEmpty.validator'
import { IsExist } from '@/utils/validators/isEmpty.validator'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Password } from '@/auth/password/entities/password.entity'
import { PasswordRepository } from '@/auth/password/repository/password.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Password])],
  controllers: [PasswordController],
  providers: [PasswordService, PasswordRepository, IsNotExist, IsExist],
  exports: [PasswordService]
})
export class PasswordModule {}
