import { DataSource, Repository } from 'typeorm'
import { Board } from './board.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager())
  }
  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoard
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC
    })
    await this.save(board)
    return board
  }
}
