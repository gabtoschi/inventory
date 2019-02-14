import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Game } from './../shared/models/game';
import { GamesService } from './games.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {

  private gameListSub: Subscription;
  public gameList: Game[];

  public isListReady = false;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.gameListSub = this.route.data.subscribe(
      (data: {gamelist: Game[]}) => {
        this.gameList = data.gamelist;
        this.gamesService.games = data.gamelist;
        this.isListReady = true;
        console.log(data.gamelist);
      }
    );
  }

  ngOnDestroy(): void {
    this.gameListSub.unsubscribe();
  }

}
