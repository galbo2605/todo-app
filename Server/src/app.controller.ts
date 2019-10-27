import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { eDistPath } from './app/enum/dist-path.enum';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getSPA(@Res() response): string {
		return response.sendFile(join(__dirname, eDistPath.DistPath));
	}
}
