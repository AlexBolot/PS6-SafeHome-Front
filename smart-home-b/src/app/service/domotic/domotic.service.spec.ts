import { TestBed, inject } from '@angular/core/testing';

import { DomoticService } from './domotic.service';

describe('DomoticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomoticService]
    });
  });

  it('should be created', inject([DomoticService], (service: DomoticService) => {
    expect(service).toBeTruthy();
  }));
});
