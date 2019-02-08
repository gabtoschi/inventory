import { Injectable } from '@angular/core';

import { Game } from './../shared/models/game';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // placeholders for tests
  _games: Game[] = [
    new Game('Super Mario Odyssey', 'Nintendo EPD', 'Nintendo', 'Platform', ['Nintendo Switch']),
    new Game('Portal 2', 'Valve', 'Valve Corporation', 'Puzzle', ['Windows PC', 'Mac OS X', 'Linux', 'PlayStation 3', 'Xbox 360'])
  ];

  public getGameList() {
    return this._games;
  }

  public getGameBySlug(slug: string) {
    for (const game of this._games) {
      if (game.slug === slug) {
        return game;
      }
    }

    return null;
  }

  public addNewGame(newGame: Game): string | null {
    let gameCounter = 0;

    for (const game of this._games) {
      if (game.slug === (newGame.slug + (gameCounter === 0 ? '' : ('-' + gameCounter)))) {
        gameCounter++;
      }
    }

    if (gameCounter > 0) {
      newGame.slug += '-' + gameCounter;
    }

    this._games.push(newGame);
    this.sortGames();

    return null;
  }

  public editGame(newData: Game, originalSlug: string): string | null {
    newData.slug = originalSlug;

    for (const game of this._games) {
      if (originalSlug === game.slug) {
        this._games.splice(this._games.indexOf(game), 1, newData);
        this.sortGames();
        break;
      }
    }

    return null;
  }

  public removeGame(slugToRemove: string) {
    for (const game of this._games) {
      if (slugToRemove === game.slug) {
        this._games.splice(this._games.indexOf(game), 1);
        this.sortGames();
        break;
      }
    }
  }

  public sortGames() {
    this._games.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  constructor() {
    for (let i = 10; i < 63; i++) {
      this._games.push(new Game(`Assassin's Creed ${i}`, 'Bugsoft São Carlos', 'Bugsoft', 'Puzzle', ['Wii U']));
    }
  }
}
