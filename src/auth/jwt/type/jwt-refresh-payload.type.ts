import { Token } from '@/token/entities/token.entity'

export type JwtRefreshPayloadType = {
  tokenId: Token['id']
  iat: number
  exp: number
}
