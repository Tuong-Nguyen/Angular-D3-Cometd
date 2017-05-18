import {Component, OnInit, OnChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment';
import { KafkaProxyService } from '../services/KafkaProxy/kafka-proxy.service';
import { FakeDataService } from 'app/services/fake-data/api/fake-data.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit, OnChanges {

  public datePipe = new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');

  public status = 'Create Instance';

  public records = [];

  public isPump: Boolean = false;

  public arrTopicName = [];
  public arrRecord = [];

  constructor(private _kafkaProxyService: KafkaProxyService, private  _fakeDataService: FakeDataService) {
  }

  fData(): any {
    // Pull data
    this._kafkaProxyService.addTopic(environment.rsr);
    this._kafkaProxyService.addTopic(environment.pump);
    this._kafkaProxyService.poll().subscribe(
      data => {
        console.log('Poll Success');
        console.log(data);

        let topicName = '';
        let dataTmp2: any;

        if (data.length > 0) {
          console.log('Case IF in Poll Success');

          for (let i = 0; i < data.length; i++) {
            console.log('======> Item : ', data[i].value);
            if (data[i].topic !== environment.pump) {
              // Reset
              if (i === 0) {
                this.arrRecord = [];
                this.arrTopicName = [];
              }
              topicName = data[i].value.measuresStream;
              console.log('Topic Name: ', topicName);

              this.arrTopicName.push(data[i].value.measuresStream);
              const realtimeData = this._fakeDataService.realtimeData(topicName);
              switch (topicName) {
                case environment.AGENTMEASURES:
                  this.arrRecord.push({
                    'records': [
                      {
                        'value': {
                          'dimension': {
                            'agentId': '8881001'
                          },
                          'realtimeData': realtimeData,
                          'pumpup': true,
                          'pumpupComplete': false
                        }
                      }
                    ]
                  });
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
                          'realtimeData': realtimeData,
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
                          'realtimeData': realtimeData,
                          'pumpup': true,
                          'pumpupComplete': true
                        }
                      }
                    ]
                  });
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
                          'realtimeData': realtimeData,
                          'pumpup': false,
                          'pumpupComplete': false
                        }
                      }
                    ]
                  });
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
                          'realtimeData': realtimeData,
                          'pumpup': false,
                          'pumpupComplete': false
                        }
                      }
                    ]
                  });
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
                          'realtimeData': realtimeData,
                          'pumpup': false,
                          'pumpupComplete': false
                        }
                      }
                    ]
                  });
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
                          'realtimeData': realtimeData,
                          'pumpup': false,
                          'pumpupComplete': false
                        }
                      }
                    ]
                  });
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
                          'realtimeData': realtimeData,
                          'pumpup': false,
                          'pumpupComplete': false
                        }
                      }
                    ]
                  });
                  break;
              }

              // Send data to Topic
              console.log(this.arrRecord);
              console.log(this.arrRecord[i].records[0]);
              this.sendMessage(topicName, this.arrRecord[i].records[0].value);

              // Send data to Result Topic
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
              this.sendMessage(environment.result, dataTmp2.records[0].value);
            } else {
              this.isPump = true;
            }
          }
        }else {
          console.log('Case ELSE in Poll Success');
          console.log('Arr topic: ', this.arrTopicName);
          console.log('PUMP: ', this.isPump);
          if (this.arrRecord.length !== 0 && this.isPump == true) {
            const dttime = this.datePipe.transform(new Date(), 'HHmmss');
            for (let i = 0; i < this.arrTopicName.length; i++) {
              const realtimeData = this._fakeDataService.realtimeData(this.arrTopicName[i]);
              this.arrRecord[i].records[0].value.measuresStream = this.arrTopicName[i];
              this.arrRecord[i].records[0].value.realtimeData = realtimeData;
              this.arrRecord[i].records[0].value.time = dttime;
              console.log('============> push messge to topic: ', this.arrTopicName[i]);
              this.sendMessage(this.arrTopicName[i], this.arrRecord[i].records[0].value);
            }
          }
        }
      },
      error => {
        console.log('=====Poll Fail=====');
      }
    );
  }

  /**
   * Send message
   * @param message
   */
  private sendMessage(topicName: string, message: any) {
    this._kafkaProxyService.sendData(topicName, message).subscribe(
      response => {
        console.log('=====>Send message ', topicName, ' Success');
      },
      error => {
        console.log('=====>Send message Fail');
      }
    );
  }

  ngOnInit(): void {
    this.fData();
  }

  ngOnChanges() {
  }
}
