import { IsNotExist } from '@/utils/validators/isNotEmpty.validator'
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists'
  })
  @IsEmail()
  email: string | null

  @MinLength(6)
  @MaxLength(16)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message: 'Please follow the correct password format'
    }
  )
  password?: string

  hash?: string | null

  provider?: string

  socialId?: string

  @IsNotEmpty()
  name: string | null
}
