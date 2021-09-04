import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-light-dark-mode',
  templateUrl: './light-dark-mode.component.html',
  styleUrls: ['./light-dark-mode.component.css']
})
export class LightDarkModeComponent implements OnInit {
  @Input() darkMode;
  @Output() setDarkMode: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setDarkModeEmit = e => {
    this.setDarkMode.emit(e);
  }
}
