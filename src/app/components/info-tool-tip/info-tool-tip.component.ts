import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tool-tip',
  templateUrl: './info-tool-tip.component.html',
  styleUrls: ['./info-tool-tip.component.scss']
})
export class InfoToolTipComponent implements OnInit {
  @Input() pageXY;

  constructor() {}

  ngOnInit(): void {}
}
