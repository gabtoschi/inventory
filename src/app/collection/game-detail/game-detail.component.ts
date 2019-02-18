import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Game } from './../../shared/models/game';
import { GamesService } from './../games.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RemoveGameModalComponent } from '../remove-game-modal/remove-game-modal.component';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  public gameData: Game = null;
  public gameDataSub: Subscription;

  public removeModal: BsModalRef;

  public isDataReady = false;

  constructor(
    private route: ActivatedRoute,
    private gamesServ: GamesService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  public ngOnInit() {
    this.gameDataSub = this.route.data.subscribe(
      (data: {gamedata: Game}) => {
        if (data.gamedata == null) {
          this.router.navigate(['/collection']);
        } else {
          this.gameData = data.gamedata;
          this.isDataReady = true;
        }
      }
    );
  }

  public ngOnDestroy() {
    console.log('destroyed?');
    this.gameDataSub.unsubscribe();
  }

  public openRemoveModal() {
    this.removeModal = this.modalService.show(RemoveGameModalComponent, {
      initialState: {
        gameName: this.gameData.name,
        onConfirm: () => {
          this.removeModal.hide();
          this.gamesServ.removeGame(this.gameData.slug);
          this.router.navigate(['/collection']);
        }
      }
    });
  }

}
