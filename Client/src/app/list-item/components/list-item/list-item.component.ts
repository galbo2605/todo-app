import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material';
import { Subject } from 'rxjs';

import { ITodoItem } from '../../interfaces/list-item.interface';
import { IDispatchAction } from '../../interfaces/dispatch-action.interface';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
	formGroup: FormGroup = new FormGroup({});
	@Input() todoItems: ITodoItem[];
	@Output('action') dispatchAction = new Subject<IDispatchAction>();

	ngOnInit(): void {
		this.todoItems.forEach(todoItem => {
			this.formGroup.addControl(todoItem.id, new FormControl(todoItem.value));
		});
	}

	onAdd() {
		const itemId = Date.now().toString();
		const todoItem: ITodoItem = {
			id: itemId,
			checked: false,
			mode: 'update',
			value: ''
		};
		this.todoItems.push(todoItem);
		this.formGroup.addControl(itemId, new FormControl(''));
		this.dispatchAction.next({ type: 'create', payload: todoItem });
	}

	onInput(id: string) {
		const todoItemValue = this.formGroup.controls[id].value;
		const todoItem = this.todoItems.find(tI => tI.id === id);
		todoItem.value = todoItemValue;

		this.dispatchAction.next({ type: 'update', payload: todoItem });
	}

	onCancel(todoItem: ITodoItem) {
		todoItem.mode = 'read';
	}

	onEdit(todoItem: ITodoItem) {
		todoItem.mode = 'update';
		this.dispatchAction.next({ type: 'update', payload: todoItem });
	}

	onDelete(todoItem: ITodoItem) {
		this.todoItems = this.todoItems.filter(tI => tI.id !== todoItem.id);
		this.dispatchAction.next({ type: 'delete', payload: todoItem });
	}

	onSelection(option: MatListOption, todoItem: ITodoItem) {
		todoItem.checked = option.selected;
		this.dispatchAction.next({ type: 'update', payload: todoItem });
	}
}
