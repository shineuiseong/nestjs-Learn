import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './entity/board.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {}

  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    return this.boardRepository.save(this.boardRepository.create(createBoard))
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found
  }
}
