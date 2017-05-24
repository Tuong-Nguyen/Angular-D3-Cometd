import {Injectable, Optional} from '@angular/core';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {KafkaProxyConfiguration} from './kafka-configuration';
import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';
import {ProduceMessages} from '../kafka-rest/model/ProduceMessages';
import {Record} from '../kafka-rest/model/Record';
import {Observable} from 'rxjs/Rx';
import {OffsetWithAvroSchema} from '../kafka-rest/model/OffsetWithAvroSchema';
import {ConsumerApi} from '../kafka-rest/api/ConsumerApi';
import {RecordInfo} from '../kafka-rest/model/RecordInfo';
import {ConsumerRequest} from '../kafka-rest/model/ConsumerRequest';
import {poll} from '../ReactiveXUtils';
import {TopicSubscriptionRequest} from '../kafka-rest/model/TopicSubscriptionRequest';


@Injectable()
export class KafkaProxyService {
  private topicApi: TopicApi;
  private consumerApi: ConsumerApi;
  public instanceId: string;
  private groupName: string;
  public readonly SubscribedTopics: string[];
  public readonly Configuration: KafkaProxyConfiguration;

  constructor(topicApi: TopicApi, consumerApi: ConsumerApi, @Optional() configuration: KafkaProxyConfiguration) {
    this.topicApi = topicApi;
    this.consumerApi = consumerApi;
    this.SubscribedTopics = [];
    this.instanceId = '';
    this.groupName = 'KafkaProxy_' + Date.now();

    if (configuration) {
      this.Configuration = configuration;
    } else {
      this.Configuration = new KafkaProxyConfiguration();
    }
    if (!this.Configuration.AutoOffsetReset) {
      this.Configuration.AutoOffsetReset = AutoOffsetResetEnum.Latest;
    }
    if (!this.Configuration.AutoCommitEnable) {
      this.Configuration.AutoCommitEnable = true;
    }
    if (!this.Configuration.PollingInterval) {
      this.Configuration.PollingInterval = 1000;
    }
  }

  public sendData(topicName: string, jsonData: any): Observable<OffsetWithAvroSchema> {
    const record: Record = {
      value: jsonData
    };
    const records: ProduceMessages = {
      records: [record]
    };

    return this.topicApi.produceMessageToTopic(topicName, records);
  }

  public sendArrayData(topicName: string, jsonData: Array<any>): Observable<OffsetWithAvroSchema> {
    const arrayRecord = jsonData.map(item => {
      return {value: item};
    });

    const records: ProduceMessages = {
      records: arrayRecord
    };

    return this.topicApi.produceMessageToTopic(topicName, records);
  }

  public addTopic(topicName: string): Observable<{}> {
    if (this.SubscribedTopics.indexOf(topicName) < 0) {
      this.SubscribedTopics.push(topicName);

      if (this.instanceId !== '') {
        return this.subscribeTopics();
      } else {
        return Observable.of({});
      }
    } else {
      return Observable.of({});
    }
  }

  public removeTopic(topicName: string): Observable<{}> {
    const index = this.SubscribedTopics.indexOf(topicName);
    if (index > -1) {
      this.SubscribedTopics.splice(index, 1);

      if (this.instanceId !== '') {
        return this.subscribeTopics();
      } else {
        return Observable.of({});
      }
    } else {
      return Observable.of({});
    }
  }

  /**
   * Create a consumer instance - reuse if already exists.
   * @returns {Observable<R|T>}
   */
  public createConsumerInstance(): Observable<string> {
    const consumerRequest = this.getConsumerRequest();
    return this.consumerApi.createInstanceToGroup(this.groupName, consumerRequest)
      .map(response => {
        this.instanceId = response.instance_id;
        return response.instance_id;
      })
      .catch((error: Response) => {
        if (error.status === 409) {
          return Observable.of(this.instanceId);
        } else {
          Observable.throw(error.status);
        }
      });
  }

  /**
   * subscribeTopics
   * @returns {Observable<R|T>}
   */
  public subscribeTopics(): Observable<{}> {
    const topicSubscriptionRequest: TopicSubscriptionRequest = {topics: this.SubscribedTopics};

    return this.consumerApi.subscribesTopics(this.groupName, this.instanceId, topicSubscriptionRequest)
      .catch((error: Response) => {
        if (error.status === 404) {
          return this.createConsumerInstance().ignoreElements().concat(this.callSubscribeTopics());
        } else {
          return Observable.throw(error);
        }
      });
  }

  /**
   * Fetch data
   * @returns {Observable<R|T>}
   */
  public fetch(): Observable<Array<RecordInfo>> {
    if (this.instanceId) {
      return this.consumerApi.fetchData(this.groupName, this.instanceId, this.Configuration.PollingInterval)
        .catch((error: Response) => {
          if (error.status === 404) {
            return this.createConsumerInstance().ignoreElements()
              .concat(this.callSubscribeTopics()).ignoreElements()
              .concat(this.callFetch());
          } else {
            return Observable.throw(error);
          }
        });
    } else {
      return this.createConsumerInstance().ignoreElements()
        .concat(this.callSubscribeTopics()).ignoreElements()
        .concat(this.callFetch());
    }
  }

  private callSubscribeTopics(): Observable<{}> {
    return Observable.of(1).flatMap(item => this.subscribeTopics());
  };

  private callFetch(): Observable<Array<RecordInfo>> {
    return Observable.of(1).flatMap(item => this.fetch());
  }

  /**
   * Polling data in an interval
   * @returns {Observable<Array<RecordInfo>>}
   */
  public poll(): Observable<Array<RecordInfo>> {
    return poll(this.Configuration.PollingInterval, () => {
      return this.fetch();
    });
  }

  /**
   * Build the ConsumerRequest
   * @returns ConsumerRequest
   */
  private getConsumerRequest(): ConsumerRequest {
    const autoCommitEnable = this.Configuration.AutoCommitEnable ? 'true' : 'false';
    let autoOffsetReset: string;
    switch (this.Configuration.AutoOffsetReset) {
      case AutoOffsetResetEnum.Earliest:
        autoOffsetReset = 'earliest';
        break;
      case AutoOffsetResetEnum.Latest:
        autoOffsetReset = 'latest';
    }

    let consumerRequest: ConsumerRequest;

    consumerRequest = {
      format: 'json',
      'auto.offset.reset': autoOffsetReset,
      'auto.commit.enable': autoCommitEnable
    };

    if (this.instanceId) {
      consumerRequest.name = this.instanceId;
    }

    return consumerRequest;
  }
}

