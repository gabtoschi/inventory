import { Injectable } from '@angular/core';

import { Game } from './../shared/models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // placeholders for tests
  _games: Game[] = [
    {
      slug: "super-mario-odyssey",
      name: "Super Mario Odyssey",
      launchDate: new Date(2017, 10, 27),
      developer: "Nintendo EPD",
      publisher: "Nintendo",
      platforms: ["Nintendo Switch"],
      category: "Platform"
    },
    {
      slug: "portal-2",
      name: "Portal 2",
      launchDate: new Date(2011, 4, 19),
      developer: "Nintendo EPD",
      publisher: "Nintendo",
      platforms: ["Windows PC", "Mac OS X", "Linux", "PlayStation 3", "Xbox 360"],
      category: "Puzzle"
    },
  ];

  getGameList(){
    return this._games;
  }

  constructor() { }
}
