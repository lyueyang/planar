import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  private doneLoading: boolean;

  @Input() currentSubject: string;
  @Input() subjectChosen: EventEmitter<boolean>;
  @Output() assignmentsSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private assignmentHelper: AssignmentHelperService) {
  }

  ngOnInit(): void {
    this.doneLoading = false;
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

  removeAssignment(index: number) {
    this.assignmentHelper.removeItem(this.myAssignments.at(index).value.id).then();
    this.myAssignments.removeAt(index);
    this.assignmentsSaved.emit(true);
  }

  loadAssignment() {
    const localtz = new Date().getTimezoneOffset() * 60;
    const oneDay = 86400;

    setTimeout(() => {
      this.myAssignments = this.assignmentForm.get('myAssignments') as FormArray;

      this.myAssignments.clear();

      const reply = this.assignmentHelper.fetchDataSync(this.currentSubject).then(data => {
        this.jsonResponse = JSON.parse(JSON.stringify(data));
        if (this.jsonResponse.length > 0) {
          this.jsonResponse.forEach(
            value => {
              this.myAssignments.push(
                this.formBuilder.group({
                  id: value.id.toString(),
                  assignmentDescription: value.assignmentDescription,
                  deadline: value.deadline > 0 ? new Date((value.deadline + localtz + oneDay) * 1000) : ''
                })
              );
            }
          );
        } else {
          this.addAssignment();
        }

        this.doneLoading = true;
      });
    }, 250);
  }

  saveAssignments(){
    this.submitArray = this.formBuilder.array([]);

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
          deadline: this.myAssignments.at(index).value.deadline.toString().length < 1 ?
                      0 : this.myAssignments.at(index).value.deadline.getTime() / 1000
        }));
      }
    }

    const reply = this.assignmentHelper.submitEditSync(this.currentSubject, this.submitArray.value).then(r => {
      this.snackBar.open('Assignments Saved!', 'Dismiss', {
        duration: 3000
      });
      this.assignmentsSaved.emit(true);
    });
  }

  isSubjectSelected(){
    return this.currentSubject !== 'NONE';
  }

  isElementReady() {
    return this.isSubjectSelected() && this.doneLoading;
  }
}
