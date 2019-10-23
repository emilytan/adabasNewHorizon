import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReadController } from './read/read.controller';
import { CreateController } from './create/create.controller';
import { UpdateController } from './update/update.controller';
import { DeleteController } from './delete/delete.controller';
import { FileIoController } from './file-io/file-io.controller';

@Module({
  imports: [],
  controllers: [AppController, ReadController, CreateController, UpdateController, DeleteController, FileIoController],
  providers: [AppService]
})
export class AppModule {}
