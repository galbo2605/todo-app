import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodoItem } from '../../interfaces/list-item.interface';
import { ListItemApiService } from '../../services/list-item-api.service';
import { IDispatchAction } from '../../interfaces/dispatch-action.interface';

@Component({
	selector: 'app-list-item-container',
	templateUrl: './list-item-container.component.html',
	styleUrls: ['./list-item-container.component.css']
})
export class ListItemContainerComponent implements OnInit, OnDestroy {
	todoItems$: Observable<ITodoItem[]>;

	constructor(private listItemAPISVC: ListItemApiService) { }

	ngOnInit(): void {
		this.todoItems$ = this.listItemAPISVC.socketState$.asObservable();
	}

	ngOnDestroy(): void {
		this.listItemAPISVC.disconnect();
	}

	onListItemAction(action: IDispatchAction): void {
		switch (action.type) {
			case 'create':
				this.listItemAPISVC.createListItem(action.payload);
				break;
			case 'update':
				this.listItemAPISVC.updateListItem(action.payload);
				break;
			case 'delete':
				this.listItemAPISVC.deleteListItem(action.payload);
				break;
		}
	}
}
