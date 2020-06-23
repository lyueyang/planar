import {Component, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditingDialogComponent} from './editingDialog/editingDialog.component';
import {subjects} from './subjects';

@Component({
  selector: 'app-notetaking',
  templateUrl: './notetaking.component.html',
  styleUrls: ['./notetaking.component.css']
})
export class NotetakingComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private dialog: MatDialog) { }
  subjects = subjects;
  editing: boolean;
  status = 'Enable';
  selected = 'NONE';

  beginEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(EditingDialogComponent, dialogConfig);
  }

  selectSubject(name) {
    this.selected = name;
  }

  isSelectedSubject(name) {
    return this.selected === name;
  }

  openMenu(name) {
    if (this.isSelectedSubject(name)) {
      this.trigger.openMenu();
    }
  }
}
