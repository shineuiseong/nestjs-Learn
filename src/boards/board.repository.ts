import { DataSource, Repository } from 'typeorm'
import { Board } from './board.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'

export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager)
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
