import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingDialogComponent } from './editingDialog.component';

describe('EditingDialogComponent', () => {
  let component: EditingDialogComponent;
  let fixture: ComponentFixture<EditingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
