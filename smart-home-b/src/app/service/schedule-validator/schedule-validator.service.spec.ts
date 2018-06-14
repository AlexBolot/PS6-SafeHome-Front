import { TestBed, inject } from '@angular/core/testing';

import { ScheduleValidatorService } from './schedule-validator.service';

describe('ScheduleValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleValidatorService]
    });
  });

  it('should be created', inject([ScheduleValidatorService], (service: ScheduleValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
