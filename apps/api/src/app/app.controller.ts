import { Controller, Get, Param } from '@nestjs/common';
import { Adabas } from 'adabas-tcp';

import { Message } from '@ada-new-horizon/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  ada = new Adabas('daeirnd30826', 60001);

  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('readAda')
  async readAda() {
    const fileData = await this.ada.read({ fnr: 11 });
    return fileData;
  }
}
