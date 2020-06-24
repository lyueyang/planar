import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  extraInputs: number;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.extraInputs = 1;
  }

  counter(i: number) {
    this.extraInputs = i;
    return new Array(i);
  }

  addCounter() {
    this.extraInputs += 1;
    return new Array(this.extraInputs);
  }

  saveAssignments(){
    this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
    });
  }
}
