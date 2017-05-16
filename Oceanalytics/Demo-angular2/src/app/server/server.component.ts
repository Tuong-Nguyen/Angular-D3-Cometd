import {Component, OnInit, OnChanges, Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

import {Observable} from 'rxjs/Rx';
import {Consumer} from 'app/server/consumer';
import {Record} from 'app/server/record';
import {ServerService} from 'app/server/server.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit, OnChanges {
  public datePipe = new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');

  public groupName = 'Oceana_' + this.currentDate;
  public instanceName = 'Instance_' + this.currentDate;
  public urlInstance = '';
  public records = [];

  public isReady: Boolean = false;
  public isDisplay: Boolean = false;
  public flag: Boolean = true;
  public isPump: Boolean = false;
  public isPending: Boolean = false;


  public dtrs: any;
  public tpName: string;
  public arrTopicName = [];
  public arrRecord = [];
  private timer;
  newInstance: Consumer;

  constructor(private _serverService: ServerService) {
  }

  createInstance(): any {
    this.isDisplay = false;
    const data = {
      'name': this.instanceName,
      'format': 'json',
      'auto.offset.reset': 'latest', // earliest latest
      'auto.commit.enable': 'false'
    };
    // Call Service
    this._serverService.createInstance(this.groupName, data).subscribe(
      dataInstance => {
        this.newInstance = dataInstance;
        console.log('====Create Instance Success======');
        console.log(dataInstance);

        // Change urlInstance
        this.urlInstance = dataInstance.base_uri;
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
        environment.rsr,
        environment.pump
      ]
    };
    // Call Service
    this._serverService.subscribe(this.urlInstance, listTopics).subscribe(
      data => {
        console.log('=====Subscription Success=====');
        this.isReady = true;
      },
      err => {
        console.log('=====Subscription Fail=====');
      },
      () => this.fetchData()
    );
  }

  fetchData(): any {
    // Code here
    if (this.isReady === true && this.urlInstance !== '' && this.flag === true) {
      this.records = [];
      let flag = true;
      this.timer = setInterval(() => {
        if (!this.isPending && flag) {
          flag = false;
          this.isPending = true;
          const arrayUrl = [];
          this.isDisplay = true;
          // Call service
          this._serverService.getRecords(this.urlInstance).subscribe(
            data => {
              flag = true;
              console.log('===Get records success===');
              console.log(data);
              let topicName = '';
              let dataTmp2: any;

              this.isPending = false;
              this.isDisplay = true;

              if (data.length > 0) {
                this.records = this.records.concat(data);
                for (let i = 0; i < data.length; i++) {
                  if (data[i].topic !== environment.pump) {
                    // Reset
                    if (i === 0) {
                      this.arrRecord = [];
                    }
                    this.flag = false;
                    topicName = data[i].value.measuresStream;
                    this.arrTopicName.push(data[i].value.measuresStream);
                    console.log('Before adding', this.arrRecord);
                    switch (topicName) {
                      case environment.AGENTMEASURES:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'agentId': '8881001'
                                },
                                'realtimeData': {
                                  'contactsWaiting': 0,
                                  'active': 0,
                                  'heldContacts': 0,
                                  'contactsAtAgent': 0,
                                  'alerting': 0
                                },
                                'pumpup': true,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.AGENTBYACCOUNTMEASURES:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'accountId': '8881002',
                                  'agentId': '8881002'
                                },
                                'realtimeData': {
                                  'activeWorkCount': '0',
                                  'lastStateReasonTimestamp': '00000001471351598494'
                                },
                                'pumpup': false,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.ROUTINGSERVICEMEASURES:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'routingServiceName': 'ChatRoutingService'
                                },
                                'realtimeData': {
                                  'contactsWaiting': 0,
                                  'active': 0,
                                  'heldContacts': 0,
                                  'contactsAtAgent': 1,
                                  'alerting': 1
                                },
                                'pumpup': true,
                                'pumpupComplete': true
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.AGENTBYROUTINGSERVICEMEASURES:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'agentId': '8881003',
                                  'routingServiceName': 'ChatRoutingService'
                                },
                                'realtimeData': {
                                  'offered': 1,
                                  'alertDuration': 109
                                },
                                'pumpup': false,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.AGENTMEASURESMOVINGWINDOW:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'agentId': '8881004',
                                  'routingServiceName': 'ChatRoutingService'
                                },
                                'realtimeData': {
                                  'offered': 1,
                                  'alertDuration': 109
                                },
                                'pumpup': false,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.AGENTBYACCOUNTMEASURSMOVINGWINDOW:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'agentId': '8881005',
                                  'routingServiceName': 'ChatRoutingService'
                                },
                                'realtimeData': {
                                  'offered': 1,
                                  'alertDuration': 109
                                },
                                'pumpup': false,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.ROUTINGSERVICEMEASURESMOVINGWINDOW:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'agentId': '8881006',
                                  'routingServiceName': 'ChatRoutingService'
                                },
                                'realtimeData': {
                                  'offered': 1,
                                  'alertDuration': 109
                                },
                                'pumpup': false,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                      case environment.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW:
                        this.arrRecord.push({
                          'records': [
                            {
                              'value': {
                                'dimension': {
                                  'agentId': '8881007',
                                  'routingServiceName': 'ChatRoutingService'
                                },
                                'realtimeData': {
                                  'offered': 1,
                                  'alertDuration': 109
                                },
                                'pumpup': false,
                                'pumpupComplete': false
                              }
                            }
                          ]
                        })
                        ;
                        break;
                    }
                    console.log('After adding', this.arrRecord);
                    console.log('=====> Add sample record', this.arrRecord);
                    this._serverService.addRecord(topicName, this.arrRecord[i]).subscribe(
                      res1 => {
                        console.log('===Add new message to topic===');
                        console.log(res1);
                      },
                      err1 => {
                        console.log('===Add message fail 1===');
                      }
                    );

                    // Temp array
                    dataTmp2 = {
                      'records': [
                        {
                          'value': {
                            'userName': data[i].value.userName,
                            'subscriptionRequestId': data[i].value.subscriptionRequestId,
                            'measuresStream': topicName,
                            'result': 'SUCCESS',
                            'reason': 'The request was successful.',
                            'topic': topicName
                          }
                        }
                      ]
                    };
                    console.log(dataTmp2);
                    this._serverService.addRecord(environment.result, dataTmp2).subscribe(
                      res2 => {
                        console.log('===Add new message to topic result ===')
                        ;
                        console.log(res2);
                      },
                      err2 => {
                        console.log('===Add message fail 2===');
                      }
                    );

                  } else {
                    this.isPump = true;
                  }
                }
              } else {
                console.log('Send message to specific topics');
                console.log(this.arrRecord);
                if (this.arrRecord.length !== 0 && this.isPump === true) {
                  const dttime = this.datePipe.transform(new Date(), 'HHmmss');
                  for (let i = 0; i < this.arrTopicName.length; i++) {
                    this.arrRecord[i].records[0].value.measuresStream = this.arrTopicName[i];
                    this.arrRecord[i].records[0].value.time = dttime;
                    console.log('============> push messge to topic: ', this.arrTopicName[i]);
                    this._serverService.addRecord(this.arrTopicName[i], this.arrRecord[i]).subscribe(
                      res1 => {
                        console.log('===Add new message to topic===');
                        console.log(res1);
                      },
                      err1 => {
                        console.log('===Add message fail 3===');
                      }
                    );
                  }
                }
              }

            },
            err => {
              console.log('===Get records fail===');
            }
          );
        }
      }, 2000);
    }
  }

  deleteInstance(): any {
    this._serverService.deleteInstance(this.urlInstance).subscribe(
      data => {
        console.log('Delete ins' + data);
        this.records = [];
        clearInterval(this.timer);
        this.isReady = false;
      },
      err => {
        console.log('=====Delete Ins Fail=====');
      }
    );
  }

  convertString(json): any {
    return JSON.stringify(json);
  }

  ngOnInit(): void {
    this.createInstance();


  }

  ngOnChanges() {

  }

}
