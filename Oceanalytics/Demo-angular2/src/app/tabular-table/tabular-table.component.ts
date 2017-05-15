import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tabular-table',
  templateUrl: './tabular-table.component.html',
  styleUrls: ['./tabular-table.component.css']
})
export class TabularTableComponent {

  @Input() public id: string;
  @Input() public data: Array<any>;

  constructor() { }
}
