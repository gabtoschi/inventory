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

  maxPages: number = 5;
  perPage: number = 6;
  
  firstIndex: number = 1;
  lastIndex: number = this.perPage;

  constructor(
    private gamesServ: GamesService
  ) { }

  ngOnInit() {
    this.gamesServ.sortGames();
    this.gameList = this.gamesServ.getGameList();
    console.log("test");
  }

  pageChanged(value : number){
    let page = value - 1;

    this.firstIndex = this.perPage * page;
    this.lastIndex = this.firstIndex + (this.perPage - 1);
  }

}
