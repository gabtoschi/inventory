import { Injectable } from '@angular/core';

import { Game } from './../shared/models/game';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // placeholders for tests
  _games: Game[] = [
    {
      slug: "super-mario-odyssey",
      name: "Super Mario Odyssey",
      developer: "Nintendo EPD",
      publisher: "Nintendo",
      platforms: ["Nintendo Switch"],
      category: "Platform"
    },
    {
      slug: "portal-2",
      name: "Portal 2",
      developer: "Valve",
      publisher: "Valve Corporation",
      platforms: ["Windows PC", "Mac OS X", "Linux", "PlayStation 3", "Xbox 360"],
      category: "Puzzle"
    },
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

  constructor() { }
}
