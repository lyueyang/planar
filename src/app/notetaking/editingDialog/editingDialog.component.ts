import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  private subjectList: string[];
  private jsonResponse: any;

  constructor(private submitService: SubjectEditorService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subjectForm = this.formBuilder.group({
        mySubjects: this.formBuilder.array([])
    });

    this.mySubjects = this.subjectForm.get('mySubjects') as FormArray;

    this.subjectList = [];
    const reply = this.submitService.fetchDataSync().then(
      data => {
        this.jsonResponse = JSON.parse(JSON.stringify(data));
        if (this.jsonResponse.length > 0) {
          this.jsonResponse.forEach(
            value => {
              this.subjectList.push(value.name.toString());
              this.mySubjects.push(this.formBuilder.group({
                name: value.name.toString()
              }));
            }
          );
        } else { this.addSubject(); }
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
      } else {
        this.mySubjects.at(index).setValue({name: this.mySubjects.at(index).value.name.toUpperCase()});
      }
    }

    console.warn(this.mySubjects);
    const reply = this.submitService.submitEditSync(this.mySubjects.value).then(response => {
      window.location.reload();
    });
  }
}
