import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AppConfigType } from '@/configs/config.type'
import { JwtRefreshPayloadType } from '@/auth/jwt/type/jwt-refresh-payload.type'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private configService: ConfigService<AppConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.refreshSecret', { infer: true })
    })
  }

  public validate(
    payload: JwtRefreshPayloadType
  ): JwtRefreshPayloadType | never {
    if (!payload.userId) {
      throw new UnauthorizedException()
    }
    return payload
  }
}
