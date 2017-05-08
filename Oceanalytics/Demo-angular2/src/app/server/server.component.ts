import { Component, OnInit, OnChanges, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs/Rx';

import { Consumer } from 'app/server/consumer';

import { ServerService } from 'app/server/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit, OnChanges {
  
  newInstance: Consumer;

  constructor(private _serverService: ServerService) { }
  public datePipe= new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), "HHmmss");

  public groupName = 'Oceana_'+ this.currentDate;
  public instanceName = 'Instance_' + this.currentDate;

  public urlInstance = '';
  public status = "Create Instance";

  public records = [];

  public isReady : Boolean = false ;
  public isDisplay : Boolean = false;
  public flag : Boolean = true;
  public isPump : Boolean = false;
  public isPending : Boolean = false;


  public dtrs : any;
  public tpName : string;




  createInstance(): any{
  	this.isDisplay = false;
  	let data = {
		  "name": this.instanceName,
		  "format": "json",
		  "auto.offset.reset": "latest", //earliest
		  "auto.commit.enable": "false"
		};
	//Call Service
  	this._serverService.createInstance(this.groupName, data).subscribe(
	  		data => {
	  			this.newInstance = data;
	  			console.log("====Create Instance Success======");
	  			console.log(data);

	  			//Change urlInstance
	  			this.urlInstance = data.base_uri;
	  		},
	  		err => {
	  			console.log("====Create Instance Fail======");
	  			console.log(err);
  			},
  			() => this.subscribeTopic()
  		);
  }

  subscribeTopic(): any{
  	let listTopics = {
	  		'topics': [
	  			"RSR",
	  			"pump"
  			]
	  	}
	//Change status
	this.status = "Subscribe";
	//Call Service
  	this._serverService.subscribe(this.urlInstance, listTopics).subscribe(
  			data => {
  				console.log("=====Subscription Success=====");
  				this.isReady = true;
  				this.status = "Listening";
  			},
  			err =>{
  				console.log("=====Subscription Fail=====");
  			},
  			() => this.fetchData()
  		);
  }

  fetchData(): any{
  	//Code here
 	if (this.isReady === true && this.urlInstance != '' && this.flag === true) {
 		setInterval(()=>{
 			if (!this.isPending) {
 				this.isPending =true;
 				let arrayUrl : any[];
 				this.isDisplay = true;
 				
 				//Call service
				this._serverService.getRecords(this.urlInstance).subscribe(
					data => {
						console.log("===Get records success===");
						console.log("datttttttttttaaaaaaaaaaa");
						console.log(data);
						var topicName = '';
						var dataTmp1 : any;
						var dataTmp2 : any;

						this.isPending = false;
						this.isDisplay = true;
						
						if (data.length > 0) {
							this.records = this.records.concat(data);
							for (var i = 0; i < data.length; i++) {
								if (data[i].value.pump === undefined) {
									this.status = "Listening Pump";
									this.flag = false;
									topicName = data[i].value.subscriptionRequest.measuresStream;
									this.tpName = data[i].value.subscriptionRequest.measuresStream;
									//push message to topic
									dataTmp1 = {
										"records": [
											{
												"key": data[i].key,
												"value": data[i].value
											}
										]
									}

									this.dtrs = {
										"records": [
											{
												"key": data[i].key,
												"value": data[i].value
											}
										]
									}

									this._serverService.addRecord(topicName, dataTmp1).subscribe(
										res1 => {
											console.log("===Add new message to topic===");
					                    	console.log(dataTmp1);
					                        console.log(res1);
										},
										err1 => {
											console.log("===Add message fail 1===");
										}
									)

									//push data to result topic
									dataTmp2 = {
										"records": [
											{
												"key": data[i].key,
												"value": topicName
											}
										]
									}
									this._serverService.addRecord('result', dataTmp2).subscribe(
										res2 => {
											console.log("===Add new message to topic 'result' ===");
											console.log(res2);
										},
										err2 => {
											console.log("===Add message fail 2===");
										}
									)

								}
								else {
									this.status = "Ready";
									this.isPump = true;
								}
							}
						}
						else {
							this.status = "Sending";
							console.log("case else");
							console.log("is pump: "+ this.isPump);
							console.log(this.dtrs);
							console.log(this.tpName);

							if (this.dtrs != '' && this.dtrs !== undefined && this.isPump == true) {
			            		this.dtrs.records[0].value.time = this.datePipe.transform(new Date(), "HHmmss");
			            		this._serverService.addRecord(this.tpName, this.dtrs).subscribe(
			            			res1 => {
			            				console.log("===Add new message to topic===");
			            				console.log(this.dtrs);
			            				console.log(res1);
			            			},
			            			err1 => {
			            				console.log("===Add message fail 3===");
			            			}
								)
							}
							
						}

					},
					err => {
						console.log("===Get records fail===");
					}
				)
 			}
 		}, 2000);
 	}
  }

  deleteInstance(): any{
  	this._serverService.deleteInstance(this.urlInstance).subscribe(
  		data => {
  			console.log("Delete ins" + data);
  			this.records = [];
  			this.isReady = false;
  		},
  		err =>{
  			console.log("=====Delete Ins Fail=====");
  		}
  	);
  }


  ngOnInit(): void {
 	this.createInstance();

 	
  }

  ngOnChanges(){

  }

}
