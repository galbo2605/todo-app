import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MatGridListModule, MatInputModule, MatListModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		ListItemComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MatInputModule,
		MatGridListModule,
		MatListModule,
		MatButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
