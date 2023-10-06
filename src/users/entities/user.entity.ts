import { EntityHelper } from '@/utils/entity-helper'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AuthProviderEnum } from '@/auth/enum/auth-provider.enum'
import { Exclude } from 'class-transformer'

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: String, unique: true })
  email: string

  @Column({ type: Number, default: AuthProviderEnum.email })
  @Exclude({ toPlainOnly: true })
  loginType: number
}
