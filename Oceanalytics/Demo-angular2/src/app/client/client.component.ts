import {Component, OnInit} from '@angular/core';
import {ClientService} from './client.service';
import {DatePipe} from '@angular/common';
import {environment as env} from '../../environments/environment';

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
  public datePipe = new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');
  public groupName = 'Oceana_' + this.currentDate;
  public instanceName = 'Instance_' + this.currentDate;
  public env = env;
  public pumpTopic: string;
  public messages = {};
  public input = {
    'records': []
  };

  public pump = {
    'records': [
      {
        'value': {
          'userName': 'SupervisorOne',
          'password': 's3cr3t',
          'measuresStreams': []
        }
      }
    ]
  };

  public options = [{
    value: env.AGENTMEASURES,
    label: env.AGENTMEASURES
  }, {
    value: env.AGENTBYACCOUNTMEASURES,
    label: env.AGENTBYACCOUNTMEASURES
  }, {
    value: env.ROUTINGSERVICEMEASURES,
    label: env.ROUTINGSERVICEMEASURES
  }, {
    value: env.AGENTBYROUTINGSERVICEMEASURES,
    label: env.AGENTBYROUTINGSERVICEMEASURES
  }, {
    value: env.AGENTMEASURESMOVINGWINDOW,
    label: env.AGENTMEASURESMOVINGWINDOW
  }, {
    value: env.AGENTBYACCOUNTMEASURSMOVINGWINDOW,
    label: env.AGENTBYACCOUNTMEASURSMOVINGWINDOW
  }, {
    value: env.ROUTINGSERVICEMEASURESMOVINGWINDOW,
    label: env.ROUTINGSERVICEMEASURESMOVINGWINDOW
  }, {
    value: env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW,
    label: env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW}
  ];

  public logSingleString;
  public logMultipleString;

  public listTopics = {
    'topics': []
  };

  constructor(private _clientService: ClientService) {
  }

  ngOnInit() {
    this.messages[env.AGENTMEASURES] = [];
    this.messages[env.AGENTBYACCOUNTMEASURES] = [];
    this.messages[env.ROUTINGSERVICEMEASURES] = [];
    this.messages[env.AGENTBYROUTINGSERVICEMEASURES] = [];
    this.messages[env.AGENTMEASURESMOVINGWINDOW] = [];
    this.messages[env.AGENTBYACCOUNTMEASURSMOVINGWINDOW] = [];
    this.messages[env.ROUTINGSERVICEMEASURESMOVINGWINDOW] = [];
    this.messages[env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW] = [];
    this.createInstance();
  }

  createInstance(): any {
    this.isReady = false;
    const instance = {
      'name': this.instanceName,
      'format': 'json',
      'auto.offset.reset': 'earliest', // earliest or latest
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
      () => this.subscribeTopic(env.result)
    );
  }

  subscribeTopic(topic): any {
    this.listTopics.topics.push(topic);
    console.log('===========> Subscribe topic: ', this.listTopics);
    // Call Service
    this._clientService.subscribeTopic(this.urlInstance, this.listTopics).subscribe(
      data => {
        console.log('=====Subscription Success=====');
        console.log(data);
        this.isReady = true;
        console.log('====> befor delete', this.listTopics);
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
    let flag = true;
    setInterval(() => {
      if (this.isReady === true && flag) {
        flag = false;
        console.log(this.urlInstance);
        this._clientService.getRecord(this.urlInstance).subscribe(
          data => {
            flag = true;
            console.log('listening server .....', data);
            for (let i = 0; i < data.length; i++) {
              if (data[i].topic !== env.result) {
                console.log('==========> push topic name ', data[i].topic);
                this.messages[data[i].topic].push(data[i]);
              } else {
                if (data[i].value.subscriptionRequestId === this.instanceName) {
                  this.pump.records[0].value.measuresStreams = [data[i].value.measuresStream];
                  this._clientService.addRecord(env.pump, this.pump).subscribe(
                    dataSub => {
                      console.log('Subscribe successfully', dataSub);
                      this.subscribeTopic(data[i].value.measuresStream);
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
      }
    }, 5000);
  }

  convertString(json): any {
    return JSON.stringify(json);
  }
  onSingleOpened() {
    this.logSingle('- opened');
  }

  onSingleClosed() {
    this.logSingle('- closed');
  }

  onSingleSelected(item) {
    console.log('selected single item', item.label);
    this.logSingle('- selected (value: ' + item.value + ', label:' +
      item.label + ')');
  }

  onSingleDeselected(item) {
    this.logSingle('- deselected (value: ' + item.value + ', label:' +
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
      'value': {
        'userName': '',
        'subscriptionRequestId':  this.instanceName,
        'password': 's3cr3t',
        'request': 'SUBSCRIBE',
        'measuresStream': item.value
      }
    };

    this.input.records.push(record);
    console.log('=====> selected item', this.input);
  }

  onMultipleDeselected(item) {
    console.log('====> Delete item', item);
    const newRecords = [];
    this.listTopics.topics = [env.result];
    for ( let i = 0; i < this.input.records.length; i++){
      if ( this.input.records[i].value.measuresStream !== item.value) {
          newRecords.push(this.input.records[i]);
          this.listTopics.topics.push(this.input.records[i].value.measuresStream);
          }
      this.input.records = newRecords;
    }
    console.log('===> After delete ', this.listTopics);


    // SUBSCRIBE TOPIC AGAIN
    // Call Service
    this._clientService.subscribeTopic(this.urlInstance, this.listTopics).subscribe(
      data => {
        console.log('=====Subscription Success=====');
        console.log(data);
        this.messages[item.value] = [];
        // this.isReady = true;
      },
      err => {
        console.log('=====Subscription Fail=====');
      }
    );
    console.log('===> Selected item', this.input);
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
