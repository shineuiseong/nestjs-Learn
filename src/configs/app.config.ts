import { registerAs } from '@nestjs/config'
import { AppConfig } from './config.type'
import ValidateConfig from '../utils/validate.config'
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min
} from 'class-validator'
import process from 'process'

enum Environment {
  dev = 'development',
  prod = 'production',
  test = 'test'
}

class EnvironmentValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string

  @IsString()
  @IsOptional()
  API_PREFIX: string

  @IsString()
  @IsOptional()
  LANGUAGE: string
}

export default registerAs<AppConfig>('app', () => {
  ValidateConfig(process.env, EnvironmentValidator)

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'app',
    workingDir: process.env.PWD || process.cwd(),
    frontDomain: process.env.FRONT_DOMAIN,
    backDomain: process.env.BACK_DOMAIN,
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
    language: process.env.LANGUAGE || 'ko'
  }
})
