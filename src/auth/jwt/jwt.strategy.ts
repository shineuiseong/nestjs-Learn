import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AppConfigType } from '@/configs/config.type'
import { JwtPayloadType } from '@/auth/jwt/type/jwt-payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService<AppConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.accessSecret', { infer: true })
    })
  }

  public validate(payload: JwtPayloadType): JwtPayloadType | never {
    if (!payload.id) {
      throw new UnauthorizedException()
    }
    return payload
  }
}
