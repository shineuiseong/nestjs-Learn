import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@/users/users.service'
import { TokenService } from '@/token/token.service'
import { ConfigService } from '@nestjs/config'
import { AuthSignupDto } from '@/auth/dto/auth-signup.dto'
import { User } from '@/users/entities/user.entity'
import * as crypto from 'crypto'
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private configService: ConfigService
  ) {}

  async signUp(signupDto: AuthSignupDto): Promise<User> {
    try {
      const hash = crypto
        .createHash('sha256')
        .update(randomStringGenerator())
        .digest('hex')

      return await this.usersService.create({
        ...signupDto,
        hash
      })
    } catch (error) {
      console.log('Error creating user:', error)
      throw new InternalServerErrorException('Failed to create user')
    }
  }
}
