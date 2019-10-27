import { Connection, Repository } from 'typeorm';
import { TodoItemEntity } from '../../db/entities/todo-item.entity';

export const listItemProviders = [
  {
    provide: 'LISTITEM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(TodoItemEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
