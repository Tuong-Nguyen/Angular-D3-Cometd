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

  public status = 'Create Instance';

  public records = [];

  public isPump: Boolean = false;

  public arrTopicName = [];

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

        if (data.length > 0) {
          console.log('Case IF in Poll Success');

          for (let i = 0; i < data.length; i++) {
            console.log('======> Item : ', data[i].value);
            if (data[i].topic !== environment.pump) {
              // Reset
              if (i === 0) {
                this.arrTopicName = [];
              }
              topicName = data[i].value.measuresStream;
              console.log('Topic Name: ', topicName);

              this.arrTopicName.push(data[i].value.measuresStream);
              const realtimeData = this.generateRealtimeData(topicName);

              // Send data to Topic
              this.sendMessage(topicName, realtimeData.records[0].value);

              // Send data to Result Topic
              this.sendMessage(environment.result, this.createSubscriptionResponse(data[i].value.userName,
                data[i].value.subscriptionRequestId, topicName, topicName));
            } else {
              this.isPump = true;
            }
          }
        }else { // Send realtime data
          console.log('Case ELSE in Poll Success');
          console.log('Arr topic: ', this.arrTopicName);
          console.log('PUMP: ', this.isPump);
          if (this.isPump === true) {
            const dttime = this.datePipe.transform(new Date(), 'HHmmss');
            for (let i = 0; i < this.arrTopicName.length; i++) {
              const realtimeData = this._fakeDataService.realtimeData(this.arrTopicName[i]);
              console.log('============> push messge to topic: ', this.arrTopicName[i]);

              const generatedData = this.generateRealtimeData(this.arrTopicName[i]);
              this.sendMessage(this.arrTopicName[i], generatedData.records[0].value);
            }
          }
        }
      },
      error => {
        console.log('=====Poll Fail=====');
      }
    );
  }

  private generateRealtimeData(topicName: string): any {
    const realtimeData = this._fakeDataService.realtimeData(topicName);
    let generatedData;
    switch (topicName) {
      case environment.AGENTMEASURES:
        generatedData = {
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
        };
        break;
      case environment.AGENTBYACCOUNTMEASURES:
        generatedData = {
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
        };
        break;
      case environment.ROUTINGSERVICEMEASURES:
        generatedData = {
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
        };
        break;
      case environment.AGENTBYROUTINGSERVICEMEASURES:
        generatedData = {
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
        };
        break;
      case environment.AGENTMEASURESMOVINGWINDOW:
        generatedData = {
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
        };
        break;
      case environment.AGENTBYACCOUNTMEASURSMOVINGWINDOW:
        generatedData = {
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
        };
        break;
      case environment.ROUTINGSERVICEMEASURESMOVINGWINDOW:
        generatedData = {
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
        };
        break;
      case environment.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW:
        generatedData = {
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
        };
        break;
    }
    return generatedData;
  }

  /**
   * Create a SUCCESS response for a subscription
   * @param userName
   * @param subscriptionRequestId
   * @param measuresStream
   * @param topic
   * @returns {{userName: string, subscriptionRequestId: string, measuresStream: string, result: string, reason: string, topic: string}}
   */
  private createSubscriptionResponse(userName: string, subscriptionRequestId: string, measuresStream: string, topic: string): any {
    return {
      'userName': userName,
      'subscriptionRequestId': subscriptionRequestId,
      'measuresStream': measuresStream,
      'result': 'SUCCESS',
      'reason': 'The request was successful.',
      'topic': topic
    };
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
