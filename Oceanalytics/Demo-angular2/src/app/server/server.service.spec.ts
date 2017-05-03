import { TestBed, inject } from '@angular/core/testing';

import { ServerService } from './server.service';

describe('ServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerService]
    });
  });

  it('should ...', inject([ServerService], (service: ServerService) => {
    expect(service).toBeTruthy();
  }));
});
