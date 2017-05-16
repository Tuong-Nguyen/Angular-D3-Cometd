import {Component, OnInit, OnChanges, Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Consumer} from 'app/server/consumer';
import {ServerService} from 'app/server/server.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit, OnChanges {

  newInstance: Consumer;

  public datePipe = new DatePipe('en-US');
  public currentDate = this.datePipe.transform(new Date(), 'HHmmss');

  public groupName = 'Oceana_' + this.currentDate;
  public instanceName = 'Instance_' + this.currentDate;

  public urlInstance = '';
  public status = 'Create Instance';

  public records = [];

  public isReady: Boolean = false;
  public isDisplay: Boolean = false;
  public flag: Boolean = true;
  public isPump: Boolean = false;
  public isPending: Boolean = false;

  public realtimeData: any;
  public arrTopicName = [];
  public arrLabelName = [];
  private timer;

  constructor(private _serverService: ServerService) {
  }

  /**
   * Create consumer instance then subscribe topics
   */
  private createInstance(): any {
    this.isDisplay = false;
    const data = {
      'name': this.instanceName,
      'format': 'json',
      'auto.offset.reset': 'latest', // earliest latest
      'auto.commit.enable': 'false'
    };
    // Call Service
    this._serverService.createInstance(this.groupName, data).subscribe(
      consumerInfo => {
        this.newInstance = consumerInfo;
        console.log('====Create Instance Success======');
        console.log(consumerInfo);

        // Change urlInstance
        this.urlInstance = consumerInfo.base_uri;
      },
      err => {
        console.log('====Create Instance Fail======');
        console.log(err);
      },
      () => this.subscribeTopic()
    );
  }

  /**
   * Subscribe RSR and Pump topics
   */
  private subscribeTopic(): any {
    const listTopics = {
      'topics': [
        environment.rsr,
        environment.pump
      ]
    };
    // Change status
    this.status = 'Subscribe';
    // Call Service
    this._serverService.subscribe(this.urlInstance, listTopics).subscribe(
      data => {
        console.log('=====Subscription Success=====');
        this.isReady = true;
        this.status = 'Listening';
      },
      err => {
        console.log('=====Subscription Fail=====');
      },
      () => this.fetchData()
    );
  }

  private fetchData(): any {
    // Code here
    if (this.isReady === true && this.urlInstance !== '' && this.flag === true) {
      this.records = [];
      let flag = true;
      this.timer = setInterval(() => {
        if (!this.isPending && flag) {
          flag = false;
          this.isPending = true;
          this.isDisplay = true;
          // Call service
          this._serverService.getRecords(this.urlInstance).subscribe(
            data => {
              flag = true;
              console.log('===Get records success===');
              console.log(data);

              this.isPending = false;
              this.isDisplay = true;

              if (data.length > 0) {
                this.records = this.records.concat(data);
                console.log(data);

                for (let i = 0; i < data.length; i++) {
                  if (data[i].value.pump === undefined) { // Realtimesubscriptionrequest request
                    this.status = 'Listening Pump';
                    this.flag = false;

                    const topicName = data[i].value.subscriptionRequest.measuresStream;

                    console.log('topicName: ', topicName);

                    this.arrTopicName.push(data[i].value.subscriptionRequest.measuresStream);
                    this.arrLabelName.push(data[i].value.kafkaTopicName);

                    this.realtimeData = {
                      'records': [
                        {
                          'key': data[i].key,
                          'value': data[i].value
                        }
                      ]
                    };

                    this.sendMessage(topicName, this.realtimeData);

                    // push data to result topic
                    const subscribeResponse = {
                      records: [
                        {
                          key: data[i].key,
                          value: topicName
                        }
                      ]
                    };
                    console.log(subscribeResponse);
                    this.sendMessage(environment.result, subscribeResponse);
                  } else {
                    this.status = 'Ready';
                    this.isPump = true;
                  }
                }
              } else {
                this.sendRealtimeData();
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

  /**
   * Send realtime data
   */
  private sendRealtimeData() {
    this.status = 'Sending';

    console.log('Is pump: ', this.isPump);
    console.log('Arr topic: ', this.arrTopicName);
    console.log('Arr label: ', this.arrLabelName);

    console.log(this.realtimeData);
    if (this.realtimeData !== '' && this.realtimeData !== undefined && this.isPump === true) {
      console.log(this.realtimeData);
      const dateTime = this.datePipe.transform(new Date(), 'HHmmss');

      for (let i = 0; i < this.arrTopicName.length; i++) {
        this.realtimeData.records[0].value.kafkaTopicName = this.arrLabelName[i];
        this.realtimeData.records[0].value.time = dateTime;
        console.log('============> push messge to topic: ', this.arrTopicName[i]);
        this.sendMessage(this.arrTopicName[i], this.realtimeData);
      }
    }
  }

  /**
   * Send data to a topic
   * @param topic
   * @param data
   */
  private sendMessage(topic: string, data: any) {
    this._serverService.addRecord(topic, data).subscribe(
      messageInfo => {
        console.log('===Add new message to topic ===', topic);
        console.log(messageInfo);
      },
      error => {
        console.log('=== Add message fail ===', topic, data);
      }
    );
  }

  /**
   * Stop fetching data and delete consumer instance
   */
  private deleteInstance(): any {
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

  ngOnInit(): void {
    this.createInstance();
  }

  ngOnChanges() {
  }
}
