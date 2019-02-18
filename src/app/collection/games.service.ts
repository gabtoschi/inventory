import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Game } from './../shared/models/game';
import { ErrorsService } from '../error-notificator/errors.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private apiUrl = 'http://localhost:3000/games';

  // placeholders for tests
  public games: Game[] = null;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService
  ) { }

  public getGameList(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  public getGameBySlug(slug: string) {
    return this.http.get<Game>(`${this.apiUrl}/${slug}`);
  }

  public getGameLocally(slug: string) {
    console.log(slug);

    for (const game of this.games) {
      if (slug === game.slug) {
        console.log('yep');
        return game;
      }
    }

    return null;
  }

  public addNewGame(newGame: Game): string | null {
    this.generateNewSlug(newGame);

    this.http.post(this.apiUrl, newGame)
    .pipe(
      catchError(error => {
        this.errors.createErrorMessage('Something bad happened; please try again later.');
        return throwError('Something bad happened; please try again later.');
      })
    )
    .subscribe(
      (val) => {
        this.addLocally(newGame);
      }
    );

    return null;
  }

  private addLocally(newGame: Game) {
    this.games.push(newGame);
    this.sortGames(this.games);
  }

  private generateNewSlug(newGame: Game) {
    let gameCounter = 0;

    for (const game of this.games) {
      if (game.slug === (newGame.slug + (gameCounter === 0 ? '' : ('-' + gameCounter)))) {
        gameCounter++;
      }
    }

    if (gameCounter > 0) {
      newGame.slug += '-' + gameCounter;
    }
  }

  public editGame(newData: Game, originalSlug: string): string | null {
    newData.slug = originalSlug;

    this.http.put(`${this.apiUrl}/${originalSlug}`, newData)
    .pipe(
      catchError(error => {
        this.errors.createErrorMessage('Something bad happened; please try again later.');
        return throwError('Something bad happened; please try again later.');
      })
    )
    .subscribe(
      (val) => {
        this.editLocally(newData, originalSlug);
      }
    );

    return null;
  }

  private editLocally(newData: Game, originalSlug: string) {
    for (const game of this.games) {
      if (originalSlug === game.slug) {
        this.games.splice(this.games.indexOf(game), 1, newData);
        this.sortGames(this.games);
        break;
      }
    }
  }

  public removeGame(slugToRemove: string) {

    this.http.delete(`${this.apiUrl}/${slugToRemove}`)
      .pipe(
        catchError(error => {
          this.errors.createErrorMessage('Something bad happened; please try again later.');
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(
        (val) => {
          this.removeLocally(slugToRemove);
        }
      );
  }

  private removeLocally(slugToRemove: string) {
    for (const game of this.games) {
      if (slugToRemove === game.slug) {
        this.games.splice(this.games.indexOf(game), 1);
        this.sortGames(this.games);
        break;
      }
    }
  }

  public sortGames(games: Game[]) {
    games.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

}
