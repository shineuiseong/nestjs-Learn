import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { CreateUserDto } from '@/users/dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  async createUser(@Body() createUser: CreateUserDto) {
    const user = await this.usersService.create(createUser)
    return {
      id: user.id
    }
  }
}
