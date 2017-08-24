import { Component, OnInit } from '@angular/core';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
// import {GridsterConfig, GridsterItem} from 'angular-gridster2';

@Component({
  selector: 'app-gridster-demo',
  templateUrl: './gridster-demo.component.html',
  styleUrls: ['./gridster-demo.component.css']
})
export class GridsterDemoComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<Object>;

  ngOnInit() {
    this.options = {
      gridType: 'fit',
      compactUp: true,
      compactLeft: true,
      itemChangeCallback: this.itemChange.bind(this),
      margin: 10,
      outerMargin: true,
      draggable: {
        enabled: true,
        stop: this.eventStop.bind(this)
      },
      resizable: {
        enabled: true,
        stop: this.eventStop.bind(this)
      },
      swap: true
    };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2},
      {cols: 1, rows: 1, y: 0, x: 4},
      {cols: 1, rows: 1, y: 0, x: 5},
      {cols: 2, rows: 1, y: 1, x: 0},
      {cols: 1, rows: 1, y: undefined, x: undefined},
      {cols: 1, rows: 2, y: 1, x: 5},
      {cols: 1, rows: 3, y: 2, x: 0},
      {cols: 2, rows: 1, y: 2, x: 1},
      {cols: 1, rows: 1, y: 2, x: 3},
      {cols: 1, rows: 1, y: 3, x: 4, initCallback: this.itemInit.bind(this)}
    ];
  }
  // if you make changes to the options after initialization let the gridster know
  changedOptions() {
    this.options.optionsChanged();
  }

  eventStop(item, scope) {
    console.log('eventStop', item, scope);
  }

  itemChange(item, scope) {
    console.log('itemChanged', item, scope);
  }

  itemInit(item) {
    console.log('itemInitialized', item);
  }

}
