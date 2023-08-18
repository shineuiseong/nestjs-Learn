import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator'
import { IsNotExist } from '@/utils/validators/isNotEmpty.validator'

export class AuthSignupDto {
  @Validate(IsNotExist, ['User'], {
    message: 'email Already Exists'
  })
  @IsEmail()
  email: string

  @MinLength(6)
  @MaxLength(16)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message: 'Please follow the correct password format'
    }
  )
  password?: string

  @IsNotEmpty()
  name: string | null
}
