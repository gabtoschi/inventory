import { TestBed } from '@angular/core/testing';

import { GameMetadataService } from './game-metadata.service';

describe('GameMetadataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameMetadataService = TestBed.get(GameMetadataService);
    expect(service).toBeTruthy();
  });
});
