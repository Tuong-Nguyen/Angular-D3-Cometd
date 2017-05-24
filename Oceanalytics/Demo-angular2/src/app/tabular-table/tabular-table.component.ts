import {Component, Input, OnInit} from '@angular/core';
import {environment as env} from '../../environments/environment';

@Component({
	selector: 'app-tabular-table',
	templateUrl: './tabular-table.component.html',
	styleUrls: ['./tabular-table.component.css']
})
export class TabularTableComponent implements OnInit  {

	@Input() public data: Array<any>;
	@Input() public listTopicProperties: Array<any>;

	public fields : Array<any> = [];

	public env = env

	public showTab = true;

	constructor() { }

	ngOnInit() {
	}

	public checkItem(item): any{
		const index = this.fields.indexOf(item);
		console.log('index: ', index);
		if (index > -1) {
			this.fields.splice(index, 1);
		} else {
			this.fields.push(item);
		}
	}

	public displayTab(showTab): void{
		this.showTab = !showTab;
	}
}
