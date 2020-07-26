import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormArray, FormGroup, Form, FormControl} from '@angular/forms';
import {AssignmentHelperService} from './assignment-helper.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignmentForm: FormGroup;
  myAssignments: FormArray;
  private jsonResponse: any;

  @Input() currentSubject: string;
  @Input() subjectChosen: EventEmitter<boolean>;

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private assignmentHelper: AssignmentHelperService) {
  }

  ngOnInit(): void {
    if (this.subjectChosen) {
      this.subjectChosen.subscribe(data => {
        this.loadAssignment();
      });
    }

    this.assignmentForm = this.formBuilder.group({
      myAssignments: this.formBuilder.array([])
    });

    // this.addAssignment();
  }

  createAssignment() {
    return this.formBuilder.group({
      assignmentDescription: '',
      deadline: new FormControl({value: '', disabled: true})
    });
  }

  addAssignment() {
    this.myAssignments = this.assignmentForm.get('myAssignments') as FormArray;
    this.myAssignments.push(this.createAssignment());
  }

  loadAssignment() {
    this.myAssignments = this.assignmentForm.get('myAssignments') as FormArray;

    this.myAssignments.clear();

    const reply = this.assignmentHelper.fetchDataSync(this.currentSubject).then(data => {
      this.jsonResponse = JSON.parse(JSON.stringify(data));
      if (this.jsonResponse.length > 0) {
        console.warn('Assignments:');
        console.warn(data);

        // actual form stuff
        this.jsonResponse.forEach(
          value => {
            this.myAssignments.push(
              this.formBuilder.group({
                assignmentDescription: '',
                deadline: new FormControl({value: '', disabled: true})
              })
            );
          }
        );
      } else {
        console.warn('No assignments found');

        // actual form stuff
        this.addAssignment();
      }
    });
  }

  saveAssignments(){
    console.clear();
    console.warn(this.currentSubject);

    this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
    });

    // remove empty rows
    let index: number;
    const workingArray = this.assignmentForm.getRawValue().myAssignments;
    this.myAssignments = this.assignmentForm.get('myAssignments') as FormArray;

    for (index = 0; index < workingArray.length; index++) {
      if (workingArray[index].assignmentDescription.length < 1) {
        this.myAssignments.removeAt(index);
      }
    }

    console.warn(this.myAssignments.value);
    const reply = this.assignmentHelper.submitEditSync(this.currentSubject, this.myAssignments.value).then(response => {
      console.warn(response);
    });
  }

  isSubjectSelected(){
    return this.currentSubject !== 'NONE';
  }
}
