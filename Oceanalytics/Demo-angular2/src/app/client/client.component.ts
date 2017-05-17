import {Component, OnInit} from '@angular/core';
import {ClientService} from './client.service';
import {DatePipe} from '@angular/common';
import {SelectModule} from 'angular2-select';
import {environment as env} from '../../environments/environment';
import {KafkaProxyService} from '../services/KafkaProxy/kafka-proxy.service';
import {StartOfDayAgentByAccount} from 'app/services/fake-data/model/StartOfDayAgentByAccount';

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
  public datePipe = new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');
  public groupName = 'Oceana_' + this.currentDate;
  public instanceName = 'Instance_' + this.currentDate;
  public env = env;
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

  public dataResult = [];

  constructor(private _clientService: ClientService, private _kafkaProxyService: KafkaProxyService) {
  }

  ngOnInit() {

    // console.log("angdhjasdja");
    // let abc : StartOfDayAgentByAccount = new StartOfDayAgentByAccount();
    // console.log(Object.getOwnPropertyNames(abc));

    this.messages[env.AGENTMEASURES] = [];
    this.messages[env.AGENTBYACCOUNTMEASURES] = [];
    this.messages[env.ROUTINGSERVICEMEASURES] = [];
    this.messages[env.AGENTBYROUTINGSERVICEMEASURES] = [];
    this.messages[env.AGENTMEASURESMOVINGWINDOW] = [];
    this.messages[env.AGENTBYACCOUNTMEASURSMOVINGWINDOW] = [];
    this.messages[env.ROUTINGSERVICEMEASURESMOVINGWINDOW] = [];
    this.messages[env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW] = [];
    this.fData();
  }

  //=============================== New Code ==================================================
  fData(): any {
    this._kafkaProxyService.addTopic(env.result);
    this._kafkaProxyService.poll().subscribe(
      data => {
        console.log("==========Client Poll Success========");
        console.log(data);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            console.log("==============Item: ", data[i].value);
            console.log("=====>Topic: ", data[i].topic + "=====>Topic Result: ", env.result);
            if (data[i].topic !== env.result) {
              console.log('==========> Push data receive to topic: ', data[i].topic);
              this.messages[data[i].topic].push(data[i]);
              console.log(this.messages[data[i].topic]);


            } else {
              console.log('====>subscriptionRequestId: ',data[i].value.subscriptionRequestId + ' ====>instanceName', this.instanceName);
              if (data[i].value.subscriptionRequestId === this.instanceName) {
                console.log("=====> Send PUMP");
                this.pump.records[0].value.measuresStreams = [data[i].value.measuresStream];
                this._kafkaProxyService.sendData(env.pump, this.pump.records[0].value).subscribe(
                  dataSub => {
                    console.log('Subscribe successfully', dataSub);
                    this._kafkaProxyService.addTopic(data[i].value.measuresStream);
                  },
                  err => {
                    console.log('Subscribe failed', err);
                  }
                );
              }
            };
          }
        }
      },
      error => {
        console.log("==========Client Poll Fail ==========");
      }
    );
  }

  //Send data
  sendData(topic, message): any {
    console.log(message);
    for (var i = 0; i < message.records.length; i++) {
        this._kafkaProxyService.sendData(topic, message.records[i].value).subscribe(
        data => {
          console.log('====== Push data into RSR topic ====', data);
        },
        error => {
          console.log('===== Push data into RSR topic unsuccessfully =====', error);
        }
      );
    }
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
    this.listTopics.topics= [env.result];
    for ( let i = 0; i < this.input.records.length; i++){
      if ( this.input.records[i].value.subscriptionRequest.measuresStream !== item.value){
          newRecords.push(this.input.records[i]);
          this.listTopics.topics.push(this.input.records[i].value.subscriptionRequest.measuresStream);
          //REMOVE IN LISTTOPIC
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

  convertString(json): any {
    return JSON.stringify(json);
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
