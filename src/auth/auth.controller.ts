import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { AuthSignupDto } from '@/auth/dto/auth-signup.dto'
import { User } from '@/users/entities/user.entity'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async signup(
    @Body() createUserDto: AuthSignupDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      const user = await this.service.signUp(createUserDto)
      res.status(HttpStatus.OK).json({
        id: user.id,
        email: user.email,
        name: user.name
      })
    } catch (error) {
      console.error('Error during signup:', error)
      throw new BadRequestException('Invalid input data')
    }
  }
}
