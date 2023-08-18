import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { EntityHelper } from '@/utils/entity-helper'
import { User } from '@/users/entities/user.entity'

@Entity()
export class Token extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, { eager: true })
  @Index()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
