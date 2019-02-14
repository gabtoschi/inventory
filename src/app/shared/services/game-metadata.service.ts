import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum GameMetadataType {
  Genres = 'genres',
  Platforms = 'platforms'
}

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {

  private apiUrl = 'http://localhost:3000/metadata';

  constructor(
    private http: HttpClient
  ) { }

  public getMetadata(metadata: GameMetadataType) {
    return this.http.get<string[]>(`${this.apiUrl}/${metadata}`);
  }
}
