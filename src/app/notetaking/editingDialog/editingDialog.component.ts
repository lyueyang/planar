import { Component, OnInit } from '@angular/core';
import { SubjectEditorService} from './subject-editor.service';
import { subjects } from '../subjects';

@Component({
  selector: 'app-editing-dialog',
  templateUrl: './editingDialog.component.html',
  styleUrls: ['./editingDialog.component.css']
})
export class EditingDialogComponent implements OnInit {
  subjects = subjects;
  extraInputs: number;

  constructor(private userSubject: SubjectEditorService) { }

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
    console.warn('counter!: ' + this.extraInputs);
    this.extraInputs = i;
    return new Array(i);
  }

  confirmEdit() {
    this.userSubject.confirmEdit();
  }
}
