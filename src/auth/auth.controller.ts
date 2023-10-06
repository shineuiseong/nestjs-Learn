import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { AuthSignupDto } from '@/auth/dto/auth-signup.dto'
import { User } from '@/users/entities/user.entity'
import { AuthSigninDto } from '@/auth/dto/auth-signin.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() createUserDto: AuthSignupDto) {
    return await this.service.signUp(createUserDto)
  }
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: AuthSigninDto) {
    return await this.service.signIn(signInDto)
  }
}
