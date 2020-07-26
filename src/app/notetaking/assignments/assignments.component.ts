import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormArray, FormGroup, Form, FormControl, AbstractControl} from '@angular/forms';
import {AssignmentHelperService} from './assignment-helper.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {
  assignmentForm: FormGroup;
  myAssignments: FormArray;
  submitArray: FormArray;
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
  }

  createAssignment() {
    return this.formBuilder.group({
      id: Math.random().toString(),
      assignmentDescription: '',
      deadline: ''
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
                id: value.id.toString(),
                assignmentDescription: value.assignmentDescription,
                deadline: new Date(value.deadline * 1000)
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
    console.warn(this.myAssignments);
  }

  saveAssignments(){
    this.submitArray = this.formBuilder.array([]);

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
        this.submitArray.removeAt(index);
      }
      else {
        const referenceValue = this.myAssignments.at(index).value;
        this.submitArray.push(this.formBuilder.group({
          id: referenceValue.id.toString(),
          assignmentDescription: referenceValue.assignmentDescription,
          deadline: this.myAssignments.at(index).value.deadline / 1000
        }));
        // this.submitArray.at(index).patchValue({
        //   deadline: this.myAssignments.at(index).value.deadline / 1000
        // });
      }
    }

    console.warn(this.myAssignments);
    console.warn(this.submitArray);

    const reply = this.assignmentHelper.submitEditSync(this.currentSubject, this.submitArray.value).then(response => {
      // console.warn(response);
    });
  }

  isSubjectSelected(){
    return this.currentSubject !== 'NONE';
  }
}
