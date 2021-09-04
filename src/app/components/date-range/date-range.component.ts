import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { currentDate } from '../../shared/utils';
import {DateAdapter} from '@angular/material/core';

import 'moment/locale/zh-cn';


@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  @Input() darkMode;
  @Output() dateRangeChange: any = new EventEmitter();
  // for fomr group we need to import ReactiveFormsModule to app module
  // set the current date for start and end date
  range = new FormGroup({
    start: new FormControl(currentDate),
    end: new FormControl(currentDate)
  });
  disabledToday = true;
  constructor() {
  }

  ngOnInit(): void {
    this.checkDisabledToday(this.range.getRawValue());

  }

  // emit the select value and pass them to parent app component in order that call API fun
  dateRangeChangeEmit = (
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) => {
    // here a tricky that if we don't select twich , then won't emit
    // Or else if we click start, api will call one, then if we select end date, api will call again that is weird.
    if (dateRangeStart.value !== '' && dateRangeEnd.value !== '') {
      const start = dateRangeStart.value;
      const end = dateRangeEnd.value;
      this.checkDisabledToday({start, end});
      // if (dateRangeStart.value === currentDate && dateRangeEnd.value === currentDate) {
      //   this.disabledToday = true;
      // } else {
      //   this.disabledToday = false;
      // }
      this.dateRangeChange.emit([dateRangeStart.value, dateRangeEnd.value]);
    }
  }

  checkDisabledToday = ({start, end}): any => {
    // this.range.getRawValue() {start: "2021-09-03", end: "2021-09-03"}
    // const { start, end } = this.range.getRawValue();
    if (start === currentDate && end === currentDate) {
      this.disabledToday = true;
    } else {
      this.disabledToday = false;
    }
  }

  // handleToday
  handleToday = () => {
    this.range.setValue({
      start: currentDate,
      end: currentDate
    });
    this.disabledToday = true;
    this.dateRangeChange.emit([currentDate, currentDate]);
  }

  // api limit, we could only fetch 7 days ago and 2 days later data
  // So here we need limit user to select the range
  limitDaysAgo(days): Date {
    const today = new Date();
    // as today.setDate(today.getDate() - days) is number example:1609459200000 of date so we need to format it to Date format
    return new Date(today.setDate(today.getDate() - days));
  }
  limitDaysAfterdays(days): Date {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + days));
  }

  // set date range to farce use to select
  dateFilterFn = (d: Date | null): boolean => {
    // Prevent 8days ago and 2day later from being selected.
    return d >= this.limitDaysAgo(8) && d <= this.limitDaysAfterdays(2);
  }
}
