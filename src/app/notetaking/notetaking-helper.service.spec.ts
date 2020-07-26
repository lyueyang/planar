import { TestBed } from '@angular/core/testing';

import { NotetakingHelperService } from './notetaking-helper.service';

describe('NotetakingHelperService', () => {
  let service: NotetakingHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotetakingHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
