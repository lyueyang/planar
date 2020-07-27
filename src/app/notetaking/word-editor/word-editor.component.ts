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
  private doneLoading: boolean;


  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private notesHelper: WordEditorHelperService) { }

  ngOnInit(): void {
    this.doneLoading = false;

    if (this.subjectChosen) {
      this.subjectChosen.subscribe(data => {
        this.loadNotes();
      });
    }

    this.notesForm = this.formBuilder.group({
      myNotes: this.formBuilder.array([])
    });
  }

  createChapter() {
    return this.formBuilder.group({
      id: Math.random().toString(),
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

    const reply = this.notesHelper.submitEditSync(this.currentSubject, this.myNotes.value).then(response => {
      this.snackBar.open('Assignments Saved!', 'Dismiss', {
      duration: 3000
      });
    });
  }

  loadNotes() {
    setTimeout(() => {
      this.myNotes = this.notesForm.get('myNotes') as FormArray;

      this.myNotes.clear();

      const reply = this.notesHelper.fetchDataSync(this.currentSubject).then(data => {
        this.jsonResponse = JSON.parse(JSON.stringify(data));
        if (this.jsonResponse.length > 0) {
          this.jsonResponse.forEach(
            value => {
              this.myNotes.push(
                this.formBuilder.group({
                  id: value.id.toString(),
                  notes: value.notes.toString()
                })
              );
            }
          );
        } else {
          this.addChapter();
        }

        this.doneLoading = true;
      });
    },
      250);
  }

  removeNote(index: number) {
    this.notesHelper.removeItem(this.myNotes.at(index).value.id).then();
    this.myNotes.removeAt(index);
  }

  isSubjectSelected(){
    return this.currentSubject !== 'NONE';
  }

  isElementReady() {
    return this.isSubjectSelected() && this.doneLoading;
  }
}
