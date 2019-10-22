import { Controller, Get, Param } from '@nestjs/common';
import { Adabas } from 'adabas-tcp';

import { Message } from '@ada-new-horizon/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

}
