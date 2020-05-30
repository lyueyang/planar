import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectEditorService {

  constructor() { }

  confirmEdit() {
    window.alert('Subjects saved!');
  }
}
