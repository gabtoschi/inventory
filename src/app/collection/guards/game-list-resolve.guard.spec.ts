import { TestBed, async, inject } from '@angular/core/testing';

import { GameListResolveGuard } from './game-list-resolve.guard';

describe('GameListResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameListResolveGuard]
    });
  });

  it('should ...', inject([GameListResolveGuard], (guard: GameListResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
