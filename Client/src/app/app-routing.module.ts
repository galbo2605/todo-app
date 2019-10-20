import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';

const routes: Routes = [
	{ path: '', component: ListItemComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
