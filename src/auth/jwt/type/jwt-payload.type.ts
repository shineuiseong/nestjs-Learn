import { User } from '@/users/entities/user.entity'

export type JwtPayloadType = Pick<User, 'id'> & {
  iat: number
  exp: number
}
