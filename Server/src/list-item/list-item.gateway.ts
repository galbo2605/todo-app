import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ITodoItem } from './interface/todoi-item.interface';

@WebSocketGateway(4000)
export class TodoItemGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	todoItems: ITodoItem[] = [
		{ id: 'item_1', value: 'Buy boots', checked: false, mode: 'read' },
		{ id: 'item_2', value: 'Unclog the toiler', checked: true, mode: 'read' },
		{ id: 'item_3', value: 'Make lots of pizzas', checked: false, mode: 'read' },
		{ id: 'item_4', value: 'Clean the dog', checked: false, mode: 'read' },
		{ id: 'item_5', value: 'Take a nap', checked: false, mode: 'read' }
	];

	async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
		// tslint:disable-next-line: no-console
		console.log(client.id, 'connected');
		client.emit('getList', this.todoItems);
	}

	async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
		// tslint:disable-next-line: no-console
		console.log(client.id, 'disconnected');
	}

	@SubscribeMessage('todoItem')
	async onTodoItem(client, message) {
		client.broadcast.emit('todoItem', message);
	}

	@SubscribeMessage('create')
	async onCreate(@MessageBody() todoItem: ITodoItem, @ConnectedSocket() client: Socket) {
		// tslint:disable-next-line: no-console
		console.log('created', todoItem);
		this.todoItems.push(todoItem);
		client.broadcast.emit('create', todoItem);
	}

	@SubscribeMessage('update')
	async onUpdate(@MessageBody() todoItem: ITodoItem, @ConnectedSocket() client: Socket) {
		// tslint:disable-next-line: no-console
		console.log('updated', todoItem);
		const todoItemIndex = this.todoItems.findIndex(tI => tI.id === todoItem.id);
		this.todoItems[todoItemIndex] = todoItem;
		client.broadcast.emit('update', todoItem);
	}

	@SubscribeMessage('delete')
	async onDelete(@MessageBody() todoItemID: string, @ConnectedSocket() client: Socket) {
		// tslint:disable-next-line: no-console
		console.log('deleted', todoItemID);
		const todoItemIndex = this.todoItems.findIndex(tI => tI.id === todoItemID);
		this.todoItems.splice(todoItemIndex, 1);
		client.broadcast.emit('delete', todoItemID);
	}

}
