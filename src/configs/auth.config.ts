import { registerAs } from '@nestjs/config'
import { AuthConfig } from '@/configs/config.type'
import { IsString } from 'class-validator'
import ValidateConfig from '@/utils/validate.config'
import process from 'process'

class EnvironmentValidator {
  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES: string
}

export default registerAs<AuthConfig>('auth', () => {
  ValidateConfig(process.env, EnvironmentValidator)
  return {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessExpires: process.env.ACCESS_TOKEN_EXPIRES,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshExpires: process.env.REFRESH_TOKEN_EXPIRES
  }
})
