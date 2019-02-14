import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from '../../shared/models/game';
import { GamesService } from '../games.service';

@Injectable({
  providedIn: 'root'
})
export class GameListResolveGuard implements Resolve<Game[]> {

  constructor(
    private gamesService: GamesService
  ) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Game[]> | Promise<Game[]> | Game[] {

    return this.gamesService.getGameList();
  }
}
