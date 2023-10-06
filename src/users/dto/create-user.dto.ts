import { IsNotExist } from '@/utils/validators/isNotEmpty.validator'
import { IsEmail, IsNotEmpty, Validate } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists'
  })
  @IsEmail()
  email: string
}
