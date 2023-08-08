import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BoardStatus } from '../board-status.enum'

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string

  @Column('varchar')
  description: string

  @Column({ type: 'varchar', default: BoardStatus.PUBLIC })
  status: BoardStatus
}
