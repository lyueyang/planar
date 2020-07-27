import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditingDialogComponent} from './editingDialog/editingDialog.component';
import {TelegramDialogComponent} from './telegram-dialog/telegram-dialog.component';
import {NotetakingHelperService} from './notetaking-helper.service';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'app-notetaking',
  templateUrl: './notetaking.component.html',
  styleUrls: ['./notetaking.component.css']
})
export class NotetakingComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public subjectList: string[] = [];
  public subjectChosen: EventEmitter<boolean> = new EventEmitter<boolean>();
  private jsonResponse: any;

  editing: boolean;
  status = 'Enable';
  selected = 'NONE';
  selectedDate: any;
  datesToHighlight = [];
  modDate = [];
  done = false;

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
    this.subjectChosen.emit(true);
  }

  isSelectedSubject(name) {
    return this.selected === name;
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
    this.helperService.fetchDates().then(
      data => {
        this.modDate = JSON.parse(JSON.stringify(data));
        if (this.modDate.length > 0) {
          const localtz = new Date().getTimezoneOffset() * 60;
          const oneDay = 86400;

          this.modDate.forEach(
            val => {
              this.datesToHighlight.push(new Date((val.date - localtz + oneDay) * 1000));
            }
          );
          this.done = true;
        }
      }
      );
  }

  isSubjectListEmpty() {
    return this.subjectList.length < 1;
  }

  onSelect(event){
    console.log(event);
    this.selectedDate = event;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'date1' : '';
    };
  }
}
