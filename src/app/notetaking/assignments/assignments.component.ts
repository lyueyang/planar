import {Component, Input, OnInit} from '@angular/core';
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

  @Input() currentSubject: string;

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private assignmentHelper: AssignmentHelperService) {
  }

  ngOnInit(): void {
    // get assignment form from backend here
    const reply = this.assignmentHelper.fetchDataSync().then(data => {
      console.warn('Assignments:');
      console.warn(data);
    });
    // console.warn('Retrieving assignments: ' + reply);
    this.assignmentForm = this.formBuilder.group({
      myAssignments: this.formBuilder.array([])
    });

    this.addAssignment();
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

    // const reply = this.assignmentHelper.submitEdit(this.myAssignments.value);
    // console.warn(reply);
    const reply = this.assignmentHelper.submitEditSync(this.myAssignments.value).then(response => {
      console.warn(response);
    });

    if (this.myAssignments.length < 1) {
      this.addAssignment();
    }
  }
}
