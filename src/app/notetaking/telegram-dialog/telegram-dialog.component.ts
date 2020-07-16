import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TelegramHelperService} from './telegram-helper.service';

@Component({
  selector: 'app-telegram-dialog',
  templateUrl: './telegram-dialog.component.html',
  styleUrls: ['./telegram-dialog.component.css']
})
export class TelegramDialogComponent implements OnInit {
  telegramForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private submitService: TelegramHelperService) { }

  ngOnInit(): void {
    this.telegramForm = this.formBuilder.group({
      username: ''
    });
  }

  startLink() {
    this.submitService.submit(this.telegramForm.value).then(
      response => console.log(response)
    );
  }

  endLink() {
    print();
  }
}
