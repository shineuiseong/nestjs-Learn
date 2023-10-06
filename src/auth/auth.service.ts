import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@/users/users.service'
import { ConfigService } from '@nestjs/config'
import { AuthSignupDto } from '@/auth/dto/auth-signup.dto'
import { User } from '@/users/entities/user.entity'
import { AuthSigninDto } from '@/auth/dto/auth-signin.dto'
import { PasswordService } from '@/auth/password/password.service'
import { SignInResponseType } from '@/auth/types/signIn-response.type'
import { createException } from '@/common/exception/create-exception'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
    private passwordService: PasswordService
  ) {}

  async signUp(signupDto: AuthSignupDto): Promise<User> {
    try {
      const user = await this.usersService.createUser(signupDto)
      await this.passwordService.createPassword(user.id, signupDto.password)
      return user
    } catch (error) {
      throw createException(
        HttpStatus.BAD_REQUEST,
        'user',
        'failed to create user'
      )
    }
  }

  async signIn(signinDto: AuthSigninDto): Promise<SignInResponseType> {
    const user = await this.usersService.findUser({ email: signinDto.email })
    if (!user) {
      throw createException(HttpStatus.NOT_FOUND, 'email', 'email is not found')
    }
    const match = await this.passwordService.comparePassword(
      user.id,
      signinDto.password
    )

    if (!match) {
      throw createException(
        HttpStatus.UNAUTHORIZED,
        'password',
        'incorrect password'
      )
    }
    const { accessToken, refreshToken } = await this.getTokensData(user)
    console.log(accessToken)

    return {
      accessToken,
      refreshToken
    }
  }

  private async getTokensData(data: { id: User['id'] }) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          { id: data.id },
          {
            secret: this.configService.getOrThrow('auth.accessSecret', {
              infer: true
            }),
            expiresIn: this.configService.getOrThrow('auth.accessExpires', {
              infer: true
            })
          }
        ),
        this.jwtService.signAsync(
          { userId: data.id },
          {
            secret: this.configService.getOrThrow('auth.refreshSecret', {
              infer: true
            }),
            expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
              infer: true
            })
          }
        )
      ])

      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      // 여기서 에러 처리를 수행하십시오.
      throw createException(HttpStatus.BAD_REQUEST, 'token', 'jwt error')
    }
  }
}
