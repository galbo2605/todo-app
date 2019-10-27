import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoItemGateway } from './list-item/list-item.gateway';
import { listItemProviders } from './list-item/provider/list-item.providers';
import { ListItemService } from './list-item/services/list-item.service';
import { DatabaseModule } from './db/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [AppController],
	providers: [
		AppService,
		TodoItemGateway,
		...listItemProviders,
		ListItemService,
	],
})
export class AppModule { }
