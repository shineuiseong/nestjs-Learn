import {
  Validate,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEmail
} from 'class-validator'
import { IsExist } from '@/utils/validators/isEmpty.validator'

export class AuthSigninDto {
  @IsNotEmpty()
  // @Validate(IsExist, ['User'], {
  //   message: 'emailNotExists'
  // })
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message: 'Please follow the correct password format'
    }
  )
  password: string
}
