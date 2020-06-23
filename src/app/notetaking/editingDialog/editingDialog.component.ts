import { Component, OnInit } from '@angular/core';
import { SubjectEditorService} from './subject-editor.service';
import { subjects } from '../subjects';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editing-dialog',
  templateUrl: './editingDialog.component.html',
  styleUrls: ['./editingDialog.component.css']
})
export class EditingDialogComponent implements OnInit {
  subjects = subjects;
  extraInputs: number;

  constructor(private userSubject: SubjectEditorService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.extraInputs = 1;
  }

  addCounter() {
    console.warn('hello world!');
    console.warn(this.extraInputs);
    this.extraInputs += 1;
    return new Array(this.extraInputs);
  }

  counter(i: number) {
    this.extraInputs = i;
    return new Array(i);
  }

  confirmEdit() {
    this.snackBar.open('Modules Saved!');
    this.userSubject.confirmEdit();
  }
}
