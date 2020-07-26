import { TestBed } from '@angular/core/testing';

import { WordEditorHelperService } from './word-editor-helper.service';

describe('WordEditorHelperService', () => {
  let service: WordEditorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordEditorHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
