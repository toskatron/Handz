import { TestBed } from '@angular/core/testing';

import { RegHandymanService } from './reg-handyman.service';

describe('RegHandymanService', () => {
  let service: RegHandymanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegHandymanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
