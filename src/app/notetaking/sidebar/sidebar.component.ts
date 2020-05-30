import { Component, OnInit } from '@angular/core';

import {subjects} from '../subjects';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditingDialogComponent} from '../editingDialog/editingDialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  subjects = subjects;
  editing: boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  beginEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(EditingDialogComponent, dialogConfig);
  }


}
