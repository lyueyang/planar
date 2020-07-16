import { TestBed } from '@angular/core/testing';

import { TelegramHelperService } from './telegram-helper.service';

describe('TelegramHelperService', () => {
  let service: TelegramHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelegramHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
