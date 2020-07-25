import { Component, OnInit } from '@angular/core';
import {TelegramHelperService} from './telegram-helper.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-telegram-dialog',
  templateUrl: './telegram-dialog.component.html',
  styleUrls: ['./telegram-dialog.component.css']
})
export class TelegramDialogComponent implements OnInit {

  constructor(private submitService: TelegramHelperService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  startLink() {
    console.warn('link');
    this.submitService.getToken().then(
      (response) => {
        window.open('https://t.me/planar_bot?start=' + response.toString());
      },
      (error) => {
        this.snackBar.open('Error encountered, please try again!', 'Dismiss', {
          duration: 3000
        });
      });
  }

  endLink() {
    print();
  }
}
