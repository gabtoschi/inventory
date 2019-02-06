import { Injectable } from '@angular/core';

import { Game } from './../shared/models/game';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // placeholders for tests
  _games: Game[] = [
    new Game("Super Mario Odyssey", "Nintendo EPD", "Nintendo", "Platform", ["Nintendo Switch"]),
    new Game("Portal 2", "Valve", "Valve Corporation", "Puzzle", ["Windows PC", "Mac OS X", "Linux", "PlayStation 3", "Xbox 360"])
  ];

  getGameList(){
    return this._games;
  }

  getGameBySlug(slug: string){
    for (let game of this._games){
      if (game.slug === slug) return game;
    }

    return null;
  }

  addNewGame(newGame: Game): string | null {
    let gameCounter = 0;

    for (let game of this._games){
      if (game.slug == (newGame.slug + (gameCounter == 0 ? '' : ('-' + gameCounter)))){
        gameCounter++;
      }
    }

    if (gameCounter > 0) newGame.slug += '-' + gameCounter;

    this._games.push(newGame);
    this.sortGames();
    console.log(this._games);
    
    return null;
  }

  editGame(newData: Game, originalSlug: string): string | null {
    newData.slug = originalSlug;

    for (let game of this._games){
      if (originalSlug == game.slug){
        this._games.splice(this._games.indexOf(game), 1, newData);
        this.sortGames();
        break;
      }
    }
    
    console.log(this._games);
    
    return null;
  }

  removeGame(slugToRemove: string){
    for (let game of this._games){
      if (slugToRemove == game.slug){
        this._games.splice(this._games.indexOf(game), 1);
        this.sortGames();
        break;
      }
    }
  }

  sortGames() {
    this._games.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  constructor() { }
}
