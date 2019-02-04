import { Component, OnInit } from '@angular/core';

import { GamesService } from './../games.service';
import { Game } from './../../shared/models/game';

export class GameListData {
  gameData: Game;
  isActive: boolean;
}

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  gameList: GameListData[] = new Array<GameListData>();

  constructor(
    private gamesServ: GamesService
  ) { }

  ngOnInit() {
    this.gamesServ.getGameList().forEach((game) => {
      this.gameList.push({
        gameData: game,
        isActive: game.name == "Portal 2" ? true : false
      });
    });
  }

}
