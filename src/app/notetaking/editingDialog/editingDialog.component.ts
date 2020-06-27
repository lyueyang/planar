import { Component, OnInit } from '@angular/core';
import { SubjectEditorService} from './subject-editor.service';
import subjects from '../subjects.json';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-editing-dialog',
  templateUrl: './editingDialog.component.html',
  styleUrls: ['./editingDialog.component.css']
})
export class EditingDialogComponent implements OnInit {
  subjectForm: FormArray;

  constructor(private submitService: SubjectEditorService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.subjectForm = this.formBuilder.array(subjects.subjects);
  }

  ngOnInit(): void {
    this.addSubject();
    const reply = this.submitService.fetchData();
    console.warn('Retrieving subjects: ' + reply);
    // console.warn(this.subjectForm);
  }

  createSubject() {
    return this.formBuilder.group({
      name: ''
    });
  }

  addSubject() {
    this.subjectForm.push(this.createSubject());
  }

  confirmEdit() {
    this.snackBar.open('Modules Saved!', 'Dismiss', {
      duration: 3000
    });

    console.warn(this.subjectForm);

    // remove empty rows
    let index: number;
    let tracker: string[] = [];
    for (index = 0; index < this.subjectForm.controls.length; index++) {
      if (this.subjectForm.at(index).value.name.length > 0) {
        tracker.push(this.subjectForm.at(index).value);
      }
    }

    const reply = this.submitService.submitEdit(tracker);
    console.warn(reply);
  }
}
