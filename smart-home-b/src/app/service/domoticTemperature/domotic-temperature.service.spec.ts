import { TestBed, inject } from '@angular/core/testing';

import { DomoticTemperatureService } from './domotic-temperature.service';

describe('DomoticTemperatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomoticTemperatureService]
    });
  });

  it('should be created', inject([DomoticTemperatureService], (service: DomoticTemperatureService) => {
    expect(service).toBeTruthy();
  }));
});
