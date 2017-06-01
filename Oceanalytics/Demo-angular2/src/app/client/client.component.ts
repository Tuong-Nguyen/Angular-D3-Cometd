import {Component, EventEmitter, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {environment as env} from '../../environments/environment';
import {KafkaProxyService} from '../services/KafkaProxy/kafka-proxy.service';

import {MovingWindowAgent} from '../services/fake-data/model/MovingWindowAgent';
import {MovingWindowRoutingService} from '../services/fake-data/model/MovingWindowRoutingService';
import {MovingWindowAgentByAccount} from '../services/fake-data/model/MovingWindowAgentByAccount';
import {MovingWindowAgentByRoutingService} from '../services/fake-data/model/MovingWindowAgentByRoutingService';
import {StartOfDayAgent} from '../services/fake-data/model/StartOfDayAgent';
import {StartOfDayRoutingService} from '../services/fake-data/model/StartOfDayRoutingService';
import {StartOfDayAgentByAccount} from '../services/fake-data/model/StartOfDayAgentByAccount';
import {StartOfDayAgentByRoutingService} from '../services/fake-data/model/StartOfDayAgentByRoutingService';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  public status = 'Create Instance';
  public datePipe = new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');
  public instanceName = 'Instance_' + this.currentDate;
  public env = env;
  public messages = {};
  public listTopicProperties = {};
  private topicMap = []; // id = Realtime Topic - value = Measures Type
  public errMessage: string;

  public user = {
    name: '',
    password: ''
  };

  public subscribedMeasures: Array<string> = [];

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
    label: env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW
  }
  ];

  private topicChangesEmitter: EventEmitter<[string, boolean, string]>;

  constructor(private _kafkaProxyService: KafkaProxyService) {
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
    this.errMessage = ''; // Set default error message

    this.getListProperty();

    // Queue topic changes requests
    this.topicChangesEmitter = new EventEmitter<[string, boolean]>(true);
    this.topicChangesEmitter.concatMap((topicChangeEvent, index) => {
      if (topicChangeEvent[1] === true) { // Add new measures
        return this._kafkaProxyService.addTopic(topicChangeEvent[0])
          .delay(2000)
          .concat(this._kafkaProxyService.sendData(env.pump, this.createPumpRequest([topicChangeEvent[2]])));
      } else { // Remove a measures
        return this._kafkaProxyService.removeTopic(topicChangeEvent[0])
          .concat(this._kafkaProxyService.sendData(env.rsr, this.createSubscriptionRequest(topicChangeEvent[2], false)));
      }
    }).subscribe();

    this.fData();
  }

  fData(): any {
    this._kafkaProxyService.addTopic(env.result).subscribe(
      item => {
        this._kafkaProxyService.poll().subscribe(
          data => {
            console.log('==========Client Poll Success======== ', data);
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                console.log('==============Item: ', data[i].value);
                if (data[i].topic !== env.result) {
                  console.log('==========> Push received data from topic: ', data[i].topic);
                  this.addMessage(this.topicMap[data[i].topic], data[i].value);
                } else {
                  this.topicMap[data[i].value.topic] = [data[i].value.measuresStream];
                  if (data[i].value.subscriptionRequestId === this.instanceName) {
                    if (data[i].value.result === env.success) {
                      this.errMessage = '';
                      this.topicChangesEmitter.emit([data[i].value.topic, true, data[i].value.measuresStream]);
                    } else {
                      this.errMessage = data[i].value.reason;
                    }
                  }
                }
              }
            }
          },
          error => {
            console.log('==========Client Poll Fail ==========', error);
          }
        );
      },
      error => {
        console.log('error: ', error);
      }
    );
  }


  /**
   * Adding message into array
   * @param measuresType
   * @param message
   */
  addMessage(measuresType, message): void {
    const messagesArr = this.messages[measuresType];

    // find row of dimension
    for (let i = 0; i < messagesArr.length; i++) {
      // Similar dimension so real time data will be update
      if (JSON.stringify(messagesArr[i].dimension) === JSON.stringify(message.dimension)) {
        this.messages[measuresType][i] = message;
        return;
      }
    }

    // find group of dimension
    for (let i = 0; i < messagesArr.length; i++) {
      switch (measuresType) {
        case env.AGENTMEASURESMOVINGWINDOW:
          if (message.dimension.agentId === messagesArr[i].dimension.agentId) {
            this.messages[measuresType].splice(i - 1, 0, message);
            return;
          }
          break;
        case env.AGENTBYACCOUNTMEASURSMOVINGWINDOW:
          if (message.dimension.accountId === messagesArr[i].dimension.accountId) {
            this.messages[measuresType].splice(i - 1, 0, message);
            return;
          }
          break;
        case env.ROUTINGSERVICEMEASURESMOVINGWINDOW:
          if (message.dimension.routingServiceName === messagesArr[i].dimension.routingServiceName) {
            this.messages[measuresType].splice(i - 1, 0, message);
            return;
          }
          break;
        case env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW:
          if (message.dimension.agentId === messagesArr[i].dimension.agentId) {
            this.messages[measuresType].splice(i - 1, 0, message);
            return;
          }
          break;
      }
    }

    // Not found: Add to top
    this.messages[measuresType].unshift(message);
  }

  /**
   * Send a message
   * @param topic
   * @param message
   */
  sendMessage(topic, message): void {
    this._kafkaProxyService.sendData(topic, message).subscribe(
      data => {
        console.log('====== Push data into topic ==== ', topic, ' --- ', data);
      },
      error => {
        console.log('===== Push data into topic unsuccessfully ===== ', topic, ' --- ', error);
      }
    );
  }

  onMultipleSelected(item) {
    this.subscribedMeasures.push(item.value);
  }

  /**
   * Create a subscription request
   * @param measureStreams
   * @param isSubscribe
   * @returns {{userName: string, password: string, measuresStreams: Array<string>}}
   */
  private createSubscriptionRequest(measureStreams: string, isSubscribe: boolean): any {
    let request;
    if (isSubscribe) {
      request = 'SUBSCRIBE';
    } else {
      request = 'UNSUBSCRIBE';
    }

    return {
      'userName': this.user.name,
      'subscriptionRequestId': this.instanceName,
      'password': this.user.password,
      'request': request,
      'measuresStream': measureStreams,
      'version': '3.3'
    };
  }

  onMultipleDeselected(item) {
    const index = this.subscribedMeasures.indexOf(item.value);
    if (index > -1) {
      this.subscribedMeasures.splice(index, 1);
    }

    // this._kafkaProxyService.removeTopic(item.value).subscribe();
    this.topicChangesEmitter.emit([item.value, false, '']);
  }

  /**
   * Subscribe for measures
   */
  public subscribeMeasures(): void {
    for (const measure of this.subscribedMeasures) {
      this.sendMessage(env.rsr, this.createSubscriptionRequest(measure, true));
    }
  }

  /**
   * Create a pump request
   * @param measureStreams
   * @returns {{userName: string, password: string, measuresStreams: Array<string>}}
   */
  private createPumpRequest(measureStreams: Array<string>): any {
    return {
      'userName': this.user.name,
      'password': this.user.password,
      'measuresStreams': measureStreams
    };
  }

  private getListProperty(): any {
    this.listTopicProperties[env.AGENTMEASURES] = Object.getOwnPropertyNames(new StartOfDayAgent());
    this.listTopicProperties[env.AGENTBYACCOUNTMEASURES] = Object.getOwnPropertyNames(new StartOfDayAgentByAccount());
    this.listTopicProperties[env.ROUTINGSERVICEMEASURES] = Object.getOwnPropertyNames(new StartOfDayRoutingService());
    this.listTopicProperties[env.AGENTBYROUTINGSERVICEMEASURES] = Object.getOwnPropertyNames(new StartOfDayAgentByRoutingService());
    this.listTopicProperties[env.AGENTMEASURESMOVINGWINDOW] = Object.getOwnPropertyNames(new MovingWindowAgent());
    this.listTopicProperties[env.AGENTBYACCOUNTMEASURSMOVINGWINDOW] = Object.getOwnPropertyNames(new MovingWindowAgentByAccount());
    this.listTopicProperties[env.ROUTINGSERVICEMEASURESMOVINGWINDOW] = Object.getOwnPropertyNames(new MovingWindowRoutingService());
    this.listTopicProperties[env.AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW] =
      Object.getOwnPropertyNames(new MovingWindowAgentByRoutingService());
  }

  private scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
  }
}
