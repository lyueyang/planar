import {Component, OnInit, ViewChild} from '@angular/core';

import {subjects} from '../subjects';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditingDialogComponent} from '../editingDialog/editingDialog.component';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private dialog: MatDialog) { }
  subjects = subjects;
  editing: boolean;
  status = 'Enable';
  selected = 'NONE';

  ngOnInit(): void {
  }

  beginEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(EditingDialogComponent, dialogConfig);
  }

  selectSubject(name) {
    this.selected = name;

    // this.selected = this.selected === name ? 'NONE' : name;
  }

  isSelectedSubject(name) {
    return this.selected === name;
  }

  closeMenu(name) {
    if (this.isSelectedSubject(name)) {
      this.trigger.closeMenu();
    }
  }
}
