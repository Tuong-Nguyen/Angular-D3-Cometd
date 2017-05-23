import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {environment as env} from '../../environments/environment';

@Component({
	selector: 'app-configuration',
	templateUrl: './configuration.component.html',
	styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

	public env = env;
	@Input() public messages: any;
	@Input() public listTopicProperties: any;
	@Output() outputEvent:EventEmitter<any>=new EventEmitter();
	@Output() inputDataChange=new EventEmitter();

	public listTopicFields = {};
	public showTab = true;

	constructor() { 
	}

	ngOnInit() {
		this.listTopicFields[env.AGENTMEASURES] = [];
		this.listTopicFields[env.AGENTBYACCOUNTMEASURES] = [];
		this.listTopicFields[env.ROUTINGSERVICEMEASURES] = [];
		this.listTopicFields[env.AGENTBYROUTINGSERVICEMEASURES] = [];
		this.listTopicFields[env.AGENTMEASURESMOVINGWINDOW] = [];
		this.listTopicFields[env.AGENTBYACCOUNTMEASURSMOVINGWINDOW] = [];
		this.listTopicFields[env.ROUTINGSERVICEMEASURESMOVINGWINDOW] = [];
		this.listTopicFields[env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW] = [];
	}

	public checkItem(topic, item): any{
		const index = this.listTopicFields[topic].indexOf(item);
		console.log('index: ', index);
		if (index > -1) {
			this.listTopicFields[topic].splice(index, 1);
		} else {
			this.listTopicFields[topic].push(item);
		}
		this.outputEvent.emit(this.listTopicFields);
	}

	public displayTab(showTab): void{
		this.showTab = !showTab;
	}

}
