import { EntityHelper } from '@/utils/entity-helper'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '@/users/entities/user.entity'

@Entity()
export class Password extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: String })
  password: string

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => User)
  @JoinColumn()
  user: User['id']
}
