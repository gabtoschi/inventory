
import { Injectable } from '@nestjs/common';

import { GameGenres } from '../constants/game-genres';
import { GamePlatforms } from '../constants/game-platforms';

@Injectable()
export class MetadataService {

    public getGameGenres() {
        return GameGenres;
    }

    public getGamePlatforms() {
        return GamePlatforms;
    }

}
