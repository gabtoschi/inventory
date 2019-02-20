import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MetadataModule } from './Module/metadata.module';
import { GamesModule } from './Module/games.module';
import { Usermodule } from './Module/user.module';

@Module({
  imports: [MetadataModule, GamesModule, Usermodule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
