import { EntityHelper } from '@/utils/entity-helper'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { AuthProviderEnum } from '@/auth/enum/auth-provider.enum'

@Entity()
export class User extends EntityHelper {
  // TODO: id
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ type: String, nullable: true })
  name: string | null
  // TODO: email
  @Column({ type: String, unique: true, nullable: true })
  email: string

  // TODO: password
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string | null

  // TODO: password hash
  @Column({ type: String, nullable: true })
  @Exclude({ toPlainOnly: true })
  hash: string | null

  // TODO: provider -> email, kakao, google
  @Column({ default: AuthProviderEnum.email })
  provider: string

  // TODO: socialId

  @Index()
  @Column({ type: String, nullable: true })
  socialId: string | null

  @CreateDateColumn()
  createdAt: Date

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: Date

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date
}
