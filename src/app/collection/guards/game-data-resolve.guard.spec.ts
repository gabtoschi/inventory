import { TestBed, async, inject } from '@angular/core/testing';

import { GameDataResolveGuard } from './game-data-resolve.guard';

describe('GameDataResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDataResolveGuard]
    });
  });

  it('should ...', inject([GameDataResolveGuard], (guard: GameDataResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
