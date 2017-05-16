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


  public dtrs: any;
  public tpName: string;
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
              let topicName = '';
              let dataTmp1: any;
              let dataTmp2: any;

              this.isPending = false;
              this.isDisplay = true;

              if (data.length > 0) {
                this.records = this.records.concat(data);
                console.log(data);

                for (let i = 0; i < data.length; i++) {
                  if (data[i].value.pump === undefined) {
                    this.status = 'Listening Pump';
                    this.flag = false;

                    topicName = data[i].value.subscriptionRequest.measuresStream;

                    console.log('topicName');
                    console.log(topicName);

                    this.arrTopicName.push(data[i].value.subscriptionRequest.measuresStream);
                    this.arrLabelName.push(data[i].value.kafkaTopicName);

                    this.dtrs = dataTmp1 = {
                      'records': [
                        {
                          'key': data[i].key,
                          'value': data[i].value
                        }
                      ]
                    };

                    this.sendData(topicName, dataTmp1);

                    // push data to result topic
                    dataTmp2 = {
                      'records': [
                        {
                          'key': data[i].key,
                          'value': topicName
                        }
                      ]
                    };
                    console.log(dataTmp2);
                    this.sendData(environment.result, dataTmp2);
                  } else {
                    this.status = 'Ready';
                    this.isPump = true;
                  }
                }
              } else {
                this.status = 'Sending';
                console.log('Case else');
                console.log('is pump: ' + this.isPump);
                console.log('Arr topic: ');
                console.log(this.arrTopicName);
                console.log('Arr label: ');
                console.log(this.arrLabelName);

                console.log(this.dtrs);
                if (this.dtrs !== '' && this.dtrs !== undefined && this.isPump === true) {
                  console.log(this.dtrs);
                  const dttime = this.datePipe.transform(new Date(), 'HHmmss');

                  for (let i = 0; i < this.arrTopicName.length; i++) {
                    this.dtrs.records[0].value.kafkaTopicName = this.arrLabelName[i];
                    this.dtrs.records[0].value.time = dttime;
                    console.log('============> push messge to topic: ', this.arrTopicName[i]);
                    this.sendData(this.arrTopicName[i], this.dtrs);
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

  /**
   * Send data to a topic
   * @param topic
   * @param data
   */
  private sendData(topic: string, data: any) {
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
