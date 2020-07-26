import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WordEditorHelperService} from './word-editor-helper.service';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.css']
})
export class WordEditorComponent implements OnInit {
  notesForm: FormGroup;
  myNotes: FormArray;

  @Input() currentSubject: string;
  @Input() subjectChosen: EventEmitter<boolean>;
  private jsonResponse: any;


  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private notesHelper: WordEditorHelperService) { }

  ngOnInit(): void {
    if (this.subjectChosen) {
      this.subjectChosen.subscribe(data => {
        this.loadNotes();
      });
    }

    this.notesForm = this.formBuilder.group({
      myNotes: this.formBuilder.array([])
    });

    // this.addChapter();
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
    let index: number;
    const workingArray = this.notesForm.getRawValue().myNotes;
    this.myNotes = this.notesForm.get('myNotes') as FormArray;

    for (index = 0; index < workingArray.length; index++) {
      if (workingArray[index].notes.length < 1) {
        this.myNotes.removeAt(index);
      }
    }

    console.warn(this.myNotes.value);
    const reply = this.notesHelper.submitEditSync(this.currentSubject, this.myNotes.value).then(response => {
      console.warn(response);
      this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
      });
    });
  }

  loadNotes() {
    this.myNotes = this.notesForm.get('myNotes') as FormArray;

    this.myNotes.clear();

    const reply = this.notesHelper.fetchDataSync(this.currentSubject).then(data => {
      this.jsonResponse = JSON.parse(JSON.stringify(data));
      if (this.jsonResponse.length > 0) {
        console.warn('Notes:');
        console.warn(data);

        // actual form stuff
        this.jsonResponse.forEach(
          value => {
            this.myNotes.push(
              this.formBuilder.group({
                notes: ''
              })
            );
          }
        );
      } else {
        console.warn('No notes found');

        // actual form stuff
        this.addChapter();
      }
    });
  }

  isSubjectSelected(){
    return this.currentSubject !== 'NONE';
  }
}
