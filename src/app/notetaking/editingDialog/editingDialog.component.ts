import { Component, OnInit } from '@angular/core';
import { SubjectEditorService} from './subject-editor.service';
import subjects from '../subjects.json';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormArray, FormBuilder} from '@angular/forms';
import value from "*.json";

@Component({
  selector: 'app-editing-dialog',
  templateUrl: './editingDialog.component.html',
  styleUrls: ['./editingDialog.component.css']
})
export class EditingDialogComponent implements OnInit {
  subjectForm: FormArray;
  // extraInputs: number;

  constructor(private userSubject: SubjectEditorService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.subjectForm = this.formBuilder.array(subjects.subjects);
  }

  ngOnInit(): void {
    // this.extraInputs = 1;
    this.addSubject();
    console.warn(this.subjectForm);
  }

  // addCounter() {
  //   this.extraInputs += 1;
  //   return new Array(this.extraInputs);
  // }
  //
  // counter(i: number) {
  //   this.extraInputs = i;
  //   return new Array(i);
  // }

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
    this.userSubject.confirmEdit();
  }
}
