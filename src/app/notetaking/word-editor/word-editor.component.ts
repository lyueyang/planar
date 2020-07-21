import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.css']
})
export class WordEditorComponent implements OnInit {
  notesForm: FormGroup;
  myNotes: FormArray;

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.notesForm = this.formBuilder.group({
      myNotes: this.formBuilder.array([])
    });

    this.addChapter();
  }

  createChapter() {
    return this.formBuilder.group({
      notes: ''
    });
  }

  addChapter() {
    this.myNotes = this.notesForm.get('myNotes') as FormArray;
    this.myNotes.push(this.createChapter());
  }

  saveNotes() {
    this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
    });
  }
}
