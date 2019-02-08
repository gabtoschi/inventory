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

  public maxPages = 5;
  public perPage = 6;

  public firstIndex = 1;
  public lastIndex = this.perPage;

  constructor(
    private gamesServ: GamesService
  ) { }

  public ngOnInit() {
    this.gamesServ.sortGames();
    this.gameList = this.gamesServ.getGameList();
  }

  private pageChanged(value: number) {
    const page = value - 1;

    this.firstIndex = this.perPage * page;
    this.lastIndex = this.firstIndex + (this.perPage - 1);
  }

}
