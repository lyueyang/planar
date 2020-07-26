import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditingDialogComponent} from './editingDialog/editingDialog.component';
import {TelegramDialogComponent} from './telegram-dialog/telegram-dialog.component';
import {NotetakingHelperService} from './notetaking-helper.service';

@Component({
  selector: 'app-notetaking',
  templateUrl: './notetaking.component.html',
  styleUrls: ['./notetaking.component.css']
})
export class NotetakingComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public subjectList: string[] = [];
  private jsonResponse: any;

  editing: boolean;
  status = 'Enable';
  selected = 'NONE';

  constructor(private dialog: MatDialog,
              private helperService: NotetakingHelperService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

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

  scroll(el: HTMLElement, sidebar: HTMLElement) {
    el.scrollIntoView({block: 'start', behavior: 'smooth'});
    sidebar.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
  }

  linkToTelegram() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(TelegramDialogComponent, dialogConfig);
  }

  getSubjects() {
    const reply = this.helperService.fetchDataSync().then(
      data => {
        this.jsonResponse = JSON.parse(JSON.stringify(data));
        if (this.jsonResponse.length > 0) {
          this.jsonResponse.forEach(
            value => {
              this.subjectList.push(value.name.toString());
            }
          );
        }
      }
    );
  }

  isSubjectListEmpty() {
    return this.subjectList.length < 1;
  }
}
