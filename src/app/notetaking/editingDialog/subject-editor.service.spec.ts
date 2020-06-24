import { TestBed } from '@angular/core/testing';

import { SubjectEditorService } from './subject-editor.service';

describe('SubjectEditorService', () => {
  let service: SubjectEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
