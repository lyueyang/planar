import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormArray, FormGroup, Form} from '@angular/forms';
import {AssignmentHelperService} from './assignment-helper.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignmentForm: FormGroup;
  myAssignments: FormArray;

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private assignmentHelper: AssignmentHelperService) {
  }

  ngOnInit(): void {
    // get assignment form from backend here
    const reply = this.assignmentHelper.fetchData();
    console.warn('Retrieving assignments: ' + reply);
    this.assignmentForm = this.formBuilder.group({
      myAssignments: this.formBuilder.array([])
    });

    this.addAssignment();

    console.warn(this.assignmentForm);
  }

  createAssignment() {
    // group is used to allow for future detail such as deadlines
    return this.formBuilder.group({
      assignmentDescription: ''
    });
  }

  addAssignment() {
    this.myAssignments = this.assignmentForm.get('myAssignments') as FormArray;
    this.myAssignments.push(this.createAssignment());
  }

  saveAssignments(){
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

    const reply = this.assignmentHelper.submitEdit(this.assignmentForm.value.assignmentDescription);
    console.warn(reply);
  }
}
