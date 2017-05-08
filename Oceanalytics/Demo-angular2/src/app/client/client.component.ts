import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { DatePipe } from '@angular/common';
import {SelectModule} from 'angular2-select';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {
  public isReady = false;
  public newInstance;
  public urlInstance;
  public status = 'Create Instance';
  public datePipe= new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');
  public groupName = 'Oceana_' + this.currentDate;
  public instanceName = 'Instance_' + this.currentDate;
  public input = {
    'records': [
      {
        'key': this.instanceName,
        'value': {
          'kafkaTopicName': 'oceanalytics-realtime-agentmeasures',
          'subscriptionRequest': {
            'measuresStream': 'AgentPerformanceRealTimeMeasures',
            'password': 'secret',
            'user': this.instanceName
          }
        }
      }
    ]
  };

  public pump = {
    'records': [
      {
        'key': this.instanceName,
        'value': {
          'pump': this.instanceName
        }
      }
    ]
  };

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this.createInstance();
  }

  createInstance(): any {
    this.isReady = false;
    const instance = {
      'name': this.instanceName,
      'format': 'json',
      'auto.offset.reset': 'latest', // earliest
      'auto.commit.enable': 'false'
    };

    this._clientService.createInstance(this.groupName, instance).subscribe(
      data => {
        this.newInstance = data;
        console.log(data);

        // Change urlInstance
        this.urlInstance = data.base_uri;
      },
      err => {
        console.log('====Create Instance Fail======');
        console.log(err);
      },
      () => this.subscribeTopic()
    );
  }

  subscribeTopic(): any {
    const listTopics = {
      'topics': [
        'RSR',
        'pump'
      ]
    };
    // Change status
    this.status = 'Subscribe';
    // Call Service
    this._clientService.subscribeTopic(this.urlInstance, listTopics).subscribe(
      data => {
        console.log('=====Subscription Success=====');
        this.isReady = true;
        this.status = 'Listening';
      },
      err => {
        console.log('=====Subscription Fail=====');
      }
    );
  }


  addRecord(): any {

    this._clientService.addRecord('RSR', this.input).subscribe(
      data => {
        console.log('====== Push data into RSR topic ====', data);
      },
      err => {
        console.log('===== Push data into RSR topic unsuccessfully =====', err);
      }
    );
  }
}
