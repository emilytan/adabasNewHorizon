import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReadController } from './read/read.controller';
import { CreateController } from './create/create.controller';
import { UpdateController } from './update/update.controller';
import { DeleteController } from './delete/delete.controller';

@Module({
  imports: [],
  controllers: [AppController, ReadController, CreateController, UpdateController, DeleteController],
  providers: [AppService]
})
export class AppModule {}
