import { Injectable } from '@nestjs/common';

import { Game } from '../interfaces/game.interface';

@Injectable()
export class GamesService {
    private readonly games: Game[] = [];

    constructor() {
        this.create(new Game('Super Mario Odyssey', 'Nintendo EPD', 'Nintendo', 'Platform', ['Nintendo Switch']));
        this.create(new Game('Portal 2', 'Valve', 'Valve Corporation', 'Puzzle',
            ['Windows PC', 'Mac OS X', 'Linux', 'PlayStation 3', 'Xbox 360']));
        this.create(new Game('Paper Mario', 'Intelligent Systems', 'Nintendo', 'RPG',
            ['Nintendo 64', 'Wii']));
    }

    private sortGames() {
        this.games.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    public getAll(): Game[] {
        return this.games;
    }

    public getBySlug(slug: string): Game {
        for (const game of this.games) {
            if (game.slug === slug) {
                return game;
            }
        }

        return null;
    }

    public create(newGame: Game) {
        let gameCounter = 0;

        for (const game of this.games) {
            if (game.slug === (newGame.slug + (gameCounter === 0 ? '' : ('-' + gameCounter)))) {
            gameCounter++;
            }
        }

        if (gameCounter > 0) {
            newGame.slug += '-' + gameCounter;
        }

        this.games.push(newGame);
        this.sortGames();
    }

    public removeBySlug(slug: string): boolean {
        for (const game of this.games) {
            if (game.slug === slug) {
                this.games.splice(this.games.indexOf(game), 1);
                return true;
            }
        }

        return false;
    }

    public editBySlug(slug: string, newInfo: Game): boolean {
        // correcting the slug
        newInfo.slug = slug;

        if (!this.removeBySlug(slug)) {
            return false;
        }

        this.create(newInfo);

        return true;
    }

}
