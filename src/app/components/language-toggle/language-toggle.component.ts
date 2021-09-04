import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss']
})
export class LanguageToggleComponent implements OnInit {
  @Input() language;
  @Output() setLanguage: EventEmitter<string> = new EventEmitter();

  constructor(
    private adapter: DateAdapter<any>
  ) {
  }

  ngOnInit(): void {
  }

  setLanguageEmit = (e): void => {
    this.adapter.setLocale(e.value);
    this.setLanguage.emit(e.value);
  }

}
