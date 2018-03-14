import { TestBed, inject } from '@angular/core/testing';

import { UrgencyService } from './urgency.service';

describe('UrgencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrgencyService]
    });
  });

  it('should be created', inject([UrgencyService], (service: UrgencyService) => {
    expect(service).toBeTruthy();
  }));
});
