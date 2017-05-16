import {Component, OnInit} from '@angular/core';
import {ClientService} from './client.service';
import {DatePipe} from '@angular/common';
import {SelectModule} from 'angular2-select';
import {environment} from '../../environments/environment';
import {KafkaProxyService} from '../services/KafkaProxy/kafka-proxy.service';

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
  public messages = {
    'SoDagentmeasuresproducer1': [],
    'SoDagentbyaccountmeasuresproducer1': [],
    'SoDroutingservicemeasuresproducer1': [],
    'MWagentmeasuresproducer1': [],
    'MWagentbyaccountmeasuresproducer1': [],
    'MWroutingservicemeasuresproducer1': [],
    'MWagentbyroutingservicemeasuresproducer1': [],
    'servermeasurespumpuprequest1': []
  };
  public env = environment;
  public input = {
    'records': []
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

  public options = [{
    value: 'SoDagentmeasuresproducer1',
    label: 'SoDagentmeasuresproducer1'
  }, {
    value: 'SoDagentbyaccountmeasuresproducer1',
    label: 'SoDagentbyaccountmeasuresproducer1'
  }, {
    value: 'SoDroutingservicemeasuresproducer1',
    label: 'SoDroutingservicemeasuresproducer1'
  }, {
    value: 'MWagentmeasuresproducer1',
    label: 'MWagentmeasuresproducer1'
  }, {
    value: 'MWagentbyaccountmeasuresproducer1',
    label: 'MWagentbyaccountmeasuresproducer1'
  }, {
    value: 'MWroutingservicemeasuresproducer1',
    label: 'MWroutingservicemeasuresproducer1'
  }, {
    value: 'MWagentbyroutingservicemeasuresproducer1',
    label: 'MWagentbyroutingservicemeasuresproducer1'
  }, {
    value: 'servermeasurespumpuprequest1',
    label: 'servermeasurespumpuprequest1'}
  ];

  public logSingleString;
  public logMultipleString;

  public listTopics = {
    'topics': []
  };

  constructor(private _clientService: ClientService, private _kafkaProxyService: KafkaProxyService) {
  }

  ngOnInit() {
    // this.createInstance();
    this.fData();
  }

  //=============================== New Code ==================================================
  fData(): any {
    this._kafkaProxyService.addTopic(environment.result);
    this._kafkaProxyService.poll().subscribe(
      data => {
        console.log("==========Client Poll Success========");
        console.log(data);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            const item = (data[i].value);
            console.log("==============Item: ", item);
            console.log("=====>Key: ", item.key + " =====>Instance: ", this.instanceName);
            console.log("=====>Topic: ", data[i].topic + "=====>Topic Result: ", environment.result);

            if (item[0].key === this.instanceName && data[i].topic !== environment.result) {
              console.log('==========> push topic name ', data[i].topic);
              this.messages[data[i].topic].push(data[i].value[0]);

            } else {
              if (item[0].key === this.instanceName) {
                console.log("=====> Send PUMP");
                this._kafkaProxyService.sendData(environment.pump, this.pump.records[0]).subscribe(
                  dataSub => {
                    console.log('Subscribe successfully', dataSub);
                    this._kafkaProxyService.removeTopic(environment.result);
                    this._kafkaProxyService.addTopic(item[0].value);
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
        this._kafkaProxyService.sendData(topic, message.records[i]).subscribe(
        data => {
          console.log('====== Push data into RSR topic ====', data);
        },
        error => {
          console.log('===== Push data into RSR topic unsuccessfully =====', error);
        }
      );
    }
  }

  //=============================== Old Code===================================================
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
      () => this.subscribeTopic(environment.result)
    );
  }

  subscribeTopic(topic): any {
    this.listTopics.topics.push(topic);
    console.log('===========> Subscribe topic: ', this.listTopics);
    // Change status
    this.status = 'Subscribe';
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
              if (data[i].key === this.instanceName && data[i].topic !== environment.result) {
                console.log('==========> push topic name ', data[i].topic);
                this.messages[data[i].topic].push(data[i]);
              } else {
                if (data[i].key === this.instanceName) {
                  this.status = 'Push to Pump topic';
                  this._clientService.addRecord(environment.pump, this.pump).subscribe(
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
              }
              ;
            }
          },
          err => {
            console.log('listen server failed');
          }
        );
      }
    }, 5000);
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
      'key': this.instanceName,
      'value': {
        'kafkaTopicName': item.label,
        'subscriptionRequest': {
          'measuresStream': item.value,
          'password': 'secret',
          'user': this.instanceName
        }
      }
    };
    this.input.records.push(record);
    console.log('=====> selected item', this.input);
  }

  onMultipleDeselected(item) {
    console.log('====> Delete item', item);
    const newRecords = [];
    this.listTopics.topics= [environment.result];
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
