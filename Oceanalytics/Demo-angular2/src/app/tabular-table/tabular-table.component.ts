import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tabular-table',
  templateUrl: './tabular-table.component.html',
  styleUrls: ['./tabular-table.component.css']
})
export class TabularTableComponent {

  @Input() public data: Array<any>;
  @Input() public listTopicProperties: Array<any>;

  public fields: Array<any> = [];
  public showTab = true;

  constructor() {
  }

  public checkItem(item): any {
    const index = this.fields.indexOf(item);
    if (index > -1) {
      this.fields.splice(index, 1);
    } else {
      this.fields.push(item);
    }
  }

  public displayTab(showTab): void {
    this.showTab = !showTab;
  }
}
