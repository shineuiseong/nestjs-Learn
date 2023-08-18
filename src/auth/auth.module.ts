import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '@/users/users.module'
import { TokenModule } from '@/token/token.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { IsExist } from '@/utils/validators/isEmpty.validator'
import { IsNotExist } from '@/utils/validators/isNotEmpty.validator'
import { JwtStrategy } from '@/auth/jwt/jwt.strategy'
import { JwtRefreshStrategy } from '@/auth/jwt/jwt-refresh.strategy'

@Module({
  imports: [UsersModule, TokenModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, IsExist, IsNotExist, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
