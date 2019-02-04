import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Game } from './../../shared/models/game';
import { GamesService } from './../games.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  gameData: Game = null;
  gameDataSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gamesServ: GamesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameDataSub = this.route.params.subscribe(
      (params: any) => {
        let slug = params['slug'];
        this.gameData = this.gamesServ.getGameBySlug(slug);
      }
    );

    if (this.gameData == null){
      this.router.navigate(['/collection']);
    }
  }

  ngOnDestroy() {
    this.gameDataSub.unsubscribe();
  }

}
