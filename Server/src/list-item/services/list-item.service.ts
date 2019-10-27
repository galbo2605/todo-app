import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoItemEntity } from '../../db/entities/todo-item.entity';

@Injectable()
export class ListItemService {
  constructor(
    @Inject('LISTITEM_REPOSITORY')
    private readonly listItemRepository: Repository<TodoItemEntity>,
  ) {}

  async findAll(): Promise<TodoItemEntity[]> {
    return await this.listItemRepository.find();
  }
}
