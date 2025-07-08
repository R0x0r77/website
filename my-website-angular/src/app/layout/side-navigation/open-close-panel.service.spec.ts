import { TestBed } from '@angular/core/testing';

import { OpenClosePanelService } from './open-close-panel.service';

describe('OpenClosePanelService', () => {
  let service: OpenClosePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenClosePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
