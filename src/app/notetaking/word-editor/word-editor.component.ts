import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.css']
})
export class WordEditorComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveNotes() {
    this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
    });
  }
}
