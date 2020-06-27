import { TestBed } from '@angular/core/testing';

import { AssignmentHelperService } from './assignment-helper.service';

describe('AssignmentSubmitService', () => {
  let service: AssignmentHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
