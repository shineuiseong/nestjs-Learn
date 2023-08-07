import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardRepository } from './board.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}

  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoard)
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found
  }
}
