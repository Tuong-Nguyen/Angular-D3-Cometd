import {Component, OnInit, OnChanges} from '@angular/core';
import {environment} from '../../environments/environment';
import {KafkaProxyService} from '../services/KafkaProxy/kafka-proxy.service';
import {FakeDataService} from 'app/services/fake-data/api/fake-data.service';
import {RecordInfo} from '../services/kafka-rest/model/RecordInfo';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit, OnChanges {
  public status = 'Create Instance';
  public records = [];
  private isPump: Boolean = false;
  private arrTopicName = [];

  constructor(private _kafkaProxyService: KafkaProxyService, private  _fakeDataService: FakeDataService) {
  }

  fData(): any {
    // Pull data
    this._kafkaProxyService.addTopic(environment.rsr).ignoreElements()
      .concat(this._kafkaProxyService.addTopic(environment.pump).ignoreElements())
      .concat(this._kafkaProxyService.poll())
      .subscribe(
        item => {
          const data: Array<RecordInfo> = item as Array<RecordInfo>;
          console.log('Poll ', data);

          if (data.length > 0) {
            this.records = this.records.concat(data);

            console.log('data');
            console.log(data);
            console.log(this.records);

            for (let i = 0; i < data.length; i++) {
              console.log('======> Item : ', data[i].value);
              if (data[i].topic !== environment.pump) {
                // Reset
                this.isPump = false;
                if (i === 0) {
                  this.arrTopicName = [];
                }
                const topicName = data[i].value.measuresStream;
                console.log('Topic Name: ', topicName);

                this.arrTopicName.push(data[i].value.measuresStream);

                // Send data to Result Topic
                this.sendMessage(environment.result, this.createSubscriptionResponse(data[i].value.userName,
                  data[i].value.subscriptionRequestId, topicName, topicName));
              } else {
                this.isPump = true;
              }
            }
          } else { // Send realtime data
            if (this.isPump === true) {
              for (let i = 0; i < this.arrTopicName.length; i++) {
                console.log('============> push messge to topic: ', this.arrTopicName[i]);
                this.sendMessage(this.arrTopicName[i], this.generateRealtimeData(this.arrTopicName[i]));
              }
            }
          }
        },
        error => {
          console.log('=====Error: =====', error);
        }
      );
  }

  private generateRealtimeData(topicName: string): any {
    const realtimeData = this._fakeDataService.realtimeData(topicName);
    let generatedData;
    switch (topicName) {
      case environment.AGENTMEASURES:
        generatedData = {
          'dimension': {
            'agentId': '8881001'
          },
          'realtimeData': realtimeData,
          'pumpup': true,
          'pumpupComplete': false
        };
        break;
      case environment.AGENTBYACCOUNTMEASURES:
        generatedData = {
          'dimension': {
            'accountId': '8881002',
            'agentId': '8881002'
          },
          'realtimeData': realtimeData,
          'pumpup': false,
          'pumpupComplete': false
        };
        break;
      case environment.ROUTINGSERVICEMEASURES:
        generatedData = {
          'dimension': {
            'routingServiceName': 'ChatRoutingService'
          },
          'realtimeData': realtimeData,
          'pumpup': true,
          'pumpupComplete': true
        };
        break;
      case environment.AGENTBYROUTINGSERVICEMEASURES:
        generatedData = {
          'dimension': {
            'agentId': '8881003',
            'routingServiceName': 'ChatRoutingService'
          },
          'realtimeData': realtimeData,
          'pumpup': false,
          'pumpupComplete': false
        };
        break;
      case environment.AGENTMEASURESMOVINGWINDOW:
        generatedData = {
          'dimension': {
            'agentId': '8881004',
            'routingServiceName': 'ChatRoutingService'
          },
          'realtimeData': realtimeData,
          'pumpup': false,
          'pumpupComplete': false
        };
        break;
      case environment.AGENTBYACCOUNTMEASURSMOVINGWINDOW:
        generatedData = {
          'dimension': {
            'agentId': '8881005',
            'routingServiceName': 'ChatRoutingService'
          },
          'realtimeData': realtimeData,
          'pumpup': false,
          'pumpupComplete': false
        };
        break;
      case environment.ROUTINGSERVICEMEASURESMOVINGWINDOW:
        generatedData = {
          'dimension': {
            'agentId': '8881006',
            'routingServiceName': 'ChatRoutingService'
          },
          'realtimeData': realtimeData,
          'pumpup': false,
          'pumpupComplete': false
        };
        break;
      case environment.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW:
        generatedData = {
          'dimension': {
            'agentId': '8881007',
            'routingServiceName': 'ChatRoutingService'
          },
          'realtimeData': realtimeData,
          'pumpup': false,
          'pumpupComplete': false
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
