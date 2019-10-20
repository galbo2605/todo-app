import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ITodoItem } from './interfaces/list-item.interface';
import { MatListOption } from '@angular/material';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
	formGroup: FormGroup = new FormGroup({});
	todoItems: ITodoItem[] = [
		{ id: 'item_1', value: 'Buy boots', checked: false, mode: 'read' },
		{ id: 'item_2', value: 'Unclog the toiler', checked: true, mode: 'read' },
		{ id: 'item_3', value: 'Make lots of pizzas', checked: false, mode: 'read' },
		{ id: 'item_4', value: 'Clean the dog', checked: false, mode: 'read' },
		{ id: 'item_5', value: 'Take a nap', checked: false, mode: 'read' }
	];

	ngOnInit() {
		this.todoItems.forEach(todoItem => {
			this.formGroup.addControl(todoItem.id, new FormControl(todoItem.value));
		});
	}

	onAdd() {
		const itemId = `item_${(this.todoItems.length + 1)}`;
		this.todoItems.push({
			id: itemId,
			checked: false,
			mode: 'update',
			value: ''
		});
		this.formGroup.addControl(itemId, new FormControl(''));
	}

	onSave(todoItem: ITodoItem) {
		todoItem.mode = 'read';
		this.formGroup.controls[todoItem.id].patchValue(todoItem.value);
		this.todoItems.find(tI => tI.id === todoItem.id).value = todoItem.value;
		console.log(this.formGroup);
	}

	onCancel(todoItem: ITodoItem) {
		todoItem.mode = 'read';
	}

	onEdit(todoItem: ITodoItem) {
		console.log(this.todoItems);
		todoItem.mode = 'update';
	}

	onDelete(todoItem: ITodoItem) {
		console.log(this.todoItems);
		this.todoItems = this.todoItems.filter(tI => tI.id !== todoItem.id);
	}

	onSelection(option: MatListOption, todoItem: ITodoItem) {
		todoItem.checked = option.selected;
		console.log(todoItem.checked);
	}
}
