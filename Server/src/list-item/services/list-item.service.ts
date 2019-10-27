import { Injectable, Inject } from '@nestjs/common';
import { Repository, getMongoManager } from 'typeorm';
import { TodoItemEntity } from '../../db/entities/todo-item.entity';
import { ITodoItem } from '../interface/todoi-item.interface';

@Injectable()
export class ListItemService {
	constructor(
		@Inject('LISTITEM_REPOSITORY')
		private readonly listItemRepository: Repository<TodoItemEntity>,
	) { }

	async findAll(): Promise<TodoItemEntity[]> {
		return await this.listItemRepository.find();
	}

	async create(todoItem: ITodoItem): Promise<TodoItemEntity> {
		const newTodoItem = new TodoItemEntity();
		newTodoItem.value = todoItem.value;
		newTodoItem.checked = todoItem.checked;
		newTodoItem.mode = todoItem.mode;
		return await this.listItemRepository.save(newTodoItem);
	}

	async update(todoItem: ITodoItem): Promise<TodoItemEntity> {
		const foundTodoItem = await this.listItemRepository.findOne(todoItem.id);
		foundTodoItem.value = todoItem.value;
		foundTodoItem.checked = todoItem.checked;
		foundTodoItem.mode = todoItem.mode;
		return await this.listItemRepository.save(foundTodoItem);
	}

	async delete(todoItemID: string): Promise<void> {
		await this.listItemRepository.delete(todoItemID);
	}

}
