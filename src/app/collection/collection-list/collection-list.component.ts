import { Component, OnInit } from '@angular/core';

import { GamesService } from './../games.service';
import { Game } from './../../shared/models/game';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  gameList: Game[] = null;

  constructor(
    private gamesServ: GamesService
  ) { }

  ngOnInit() {
    this.gamesServ.sortGames();
    this.gameList = this.gamesServ.getGameList();
  }

}
