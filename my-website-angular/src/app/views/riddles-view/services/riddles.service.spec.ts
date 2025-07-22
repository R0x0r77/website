import { TestBed } from '@angular/core/testing';

import { RiddlesService } from './riddles.service';

describe('RiddlesService', () => {
  let service: RiddlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiddlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
