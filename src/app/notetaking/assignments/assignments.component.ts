import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormArray} from '@angular/forms';
import {AssignmentHelperService} from './assignment-helper.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignmentForm: FormArray;

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private assignmentHelper: AssignmentHelperService) {
    this.assignmentForm = this.formBuilder.array([this.createAssignment()]);
  }

  ngOnInit(): void {
    // get assignment form from backend here
    const reply = this.assignmentHelper.fetchData();
    console.warn('Retrieving assignments: ' + reply);
  }

  createAssignment() {
    // group is used to allow for future detail such as deadline
    return this.formBuilder.group({
      assignmentDescription: ''
    });
  }

  addAssignment() {
    this.assignmentForm.push(this.createAssignment());
  }

  saveAssignments(){
    this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
    });

    const reply = this.assignmentHelper.submitEdit(this.assignmentForm.value.assignmentDescription);
    // console.warn(this.assignmentForm);
    console.warn(reply);
  }
}
