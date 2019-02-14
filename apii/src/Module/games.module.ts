import { Module } from '@nestjs/common';

import { GamesService } from '../Service/games.service';
import { GamesController } from '../Controller/games.controller';

@Module({
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}
