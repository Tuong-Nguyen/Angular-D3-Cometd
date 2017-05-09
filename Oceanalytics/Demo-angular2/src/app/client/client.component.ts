import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { DatePipe } from '@angular/common';
import {SelectModule} from 'angular2-select';
import {forEach} from "@angular/router/src/utils/collection";

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
  public messages = [];
  public input = {
    'records': [
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

  public options = [{value: 'AgentPerformanceRealTimeMeasures', label: 'Agent Performance real-time measures'}, {value: 'AgentByAccountRealTimeMeasures', label: 'Agent by Account real-time measures'}, {value: 'AgentByRoutingServiceRealRimeMeasures', label: 'Agent By Routing Service real-time measures'}, 'RoutingServiceRealTimeMeasures', 'AgentIntervalMovingWindowRealTimeMeasures', 'AgentByAccountIntervalMovingWindowRealTimeMeasures', 'AgentByRoutingServiceMovingWindowRealTimeMeasures', 'RoutingServiceMovingWindowRealTimeMeasures'];

  public logSingleString;
  public logMultipleString;

  public listTopics = {
    'topics': []
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
      () => this.subscribeTopic('result')
    );
  }

  subscribeTopic(topic): any {
    this.listTopics.topics.push(topic)
    // Change status
    this.status = 'Subscribe';
    // Call Service
    this._clientService.subscribeTopic(this.urlInstance, this.listTopics).subscribe(
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


  addRecord(topic, message): any {
    this._clientService.addRecord(topic, message).subscribe(
      data => {
        console.log('====== Push data into RSR topic ====', data);
      },
      err => {
        console.log('===== Push data into RSR topic unsuccessfully =====', err);
      },
      () => this.listen()
    );
  }

  listen(): any {
    setInterval(() => {
      this._clientService.getRecord(this.urlInstance).subscribe(
        data => {
          console.log('listen server', data);
          for (let i = 0; i < data.length; i++) {
            if ( data[i].key === this.instanceName && data[i].topic !== 'result') {
              this.messages.push(data[i]);
            } else {
              if (data[i].key === this.instanceName) {
                this.status = 'Push to Pump topic';
                this._clientService.addRecord('pump', this.pump).subscribe(
                  dataSub => {
                    console.log('Subscribe successfully', dataSub);
                    this.status = 'Listening topic ' + data[i].key;
                    this.subscribeTopic(data[i].value);
                  },
                  err => {
                    console.log('Subscribe failed', err);
                  }
                );
              }
            };
          }
        },
        err => {
          console.log('listen server failed');
        }
      );
    }, 2000);
  }

  onSingleOpened() {
    this.logSingle('- opened');
  }

  onSingleClosed() {
    this.logSingle('- closed');
  }

  onSingleSelected(item) {
    console.log('selected single item', item.label);
    this.logSingle('- selected (value: ' + item.value  + ', label:' +
      item.label + ')');
  }

  onSingleDeselected(item) {
    this.logSingle('- deselected (value: ' + item.value  + ', label:' +
      item.label + ')');
  }

  onMultipleOpened() {
    this.logMultiple('- opened');
  }

  onMultipleClosed() {
    this.logMultiple('- closed');
  }

  onMultipleSelected(item) {
    const record = {
      'key': this.instanceName,
      'value': {
        'kafkaTopicName': item.label,
        'subscriptionRequest': {
          'measuresStream': item.value,
          'password': 'secret',
          'user': this.instanceName
        }
      }
    }
    this.input.records.push(record);
    console.log('selected item', this.input);
    this.logMultiple('- selected (value: ' + item.value  + ', label:' +
      item.label + ')');
  }

  onMultipleDeselected(item) {
    this.logMultiple('- deselected (value: ' + item.value  + ', label:' +
      item.label + ')');
  }

  private logSingle(msg: string) {
    this.logSingleString += msg + '\n';
  }

  private logMultiple(msg: string) {
    this.logMultipleString += msg + '\n';
  }

  private scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
  }
}
