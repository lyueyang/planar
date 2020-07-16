import { Component, OnInit } from '@angular/core';
import { SubjectEditorService} from './subject-editor.service';
import subjects from '../subjects.json';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editing-dialog',
  templateUrl: './editingDialog.component.html',
  styleUrls: ['./editingDialog.component.css']
})
export class EditingDialogComponent implements OnInit {
  subjectForm: FormGroup;
  mySubjects: FormArray;

  constructor(private submitService: SubjectEditorService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subjectForm = this.formBuilder.group({
        mySubjects: this.formBuilder.array([])
    });

    let i: number;

    this.mySubjects = this.subjectForm.get('mySubjects') as FormArray;
    for (i = 0; i < subjects.subjects.length; i++) {
      this.mySubjects.push(this.formBuilder.group({
        name: subjects.subjects[i].name
      }));
    }

    this.addSubject();
    const reply = this.submitService.fetchDataSync().then(data => {
      console.warn('Modules:');
      console.warn(data);
    });
  }

  createSubject(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  addSubject(): void {
    this.mySubjects = this.subjectForm.get('mySubjects') as FormArray;
    this.mySubjects.push(this.createSubject());
  }

  confirmEdit() {
    this.snackBar.open('Modules Saved!', 'Dismiss', {
      duration: 3000
    });

    // remove empty rows
    let index: number;
    const workingArray = this.subjectForm.getRawValue().mySubjects;
    this.mySubjects = this.subjectForm.get('mySubjects') as FormArray;

    for (index = 0; index < workingArray.length; index++) {
      if (workingArray[index].name.length < 1) {
        this.mySubjects.removeAt(index);
      }
    }

    const reply = this.submitService.submitEditSync(this.mySubjects.value).then(response => {
      console.warn(response);
    });
  }
}
