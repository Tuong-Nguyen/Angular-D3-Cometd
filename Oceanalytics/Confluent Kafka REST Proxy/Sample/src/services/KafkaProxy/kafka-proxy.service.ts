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

  public addTopic(topicName: string) {
    if (this.SubscribedTopics.indexOf(topicName) < 0) {
      this.SubscribedTopics.push(topicName);

      if (this.instanceId !== '') {
        this.subscribeTopics().subscribe();
      }
    }
  }

  public removeTopic(topicName: string) {
    const index = this.SubscribedTopics.indexOf(topicName);
    if (index > -1) {
      this.SubscribedTopics.splice(index, 1);

      if (this.instanceId !== '') {
        this.subscribeTopics().subscribe();
      }
    }
  }

  public readData(topicName: string): Observable<Array<RecordInfo>> {
    const consumerRequest = this.getConsumerRequest();

    const groupName = consumerRequest.name;
    return this.consumerApi.createInstanceToGroup(groupName, consumerRequest)
      .map(response => {
        return response.instance_id;
      })
      .catch((error: Response) => {
        if (error.status === 409) {
          return Observable.of(consumerRequest.name);
        } else {
          Observable.throw(error.status);
        }
      })
      .flatMap((name) => this.consumerApi.subscribesTopics(groupName, name, {topics: [topicName]}))
      .flatMap(item => this.consumerApi.fetchData(groupName, consumerRequest.name));
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
    return this.consumerApi.subscribesTopics(this.groupName, this.instanceId, this.SubscribedTopics)
      .catch((error: Response) => {
        if (error.status === 404) {
          return this.createConsumerInstance().ignoreElements().concat(this.consumerApi.subscribesTopics(this.groupName,
            this.instanceId, this.SubscribedTopics));
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
    return this.consumerApi.fetchData(this.groupName, this.instanceId)
      .catch((error: Response) => {
        if (error.status === 404) {
          return this.createConsumerInstance().ignoreElements()
            .concat(this.consumerApi.subscribesTopics(this.groupName, this.instanceId, this.SubscribedTopics)).ignoreElements()
            .concat(this.consumerApi.fetchData(this.groupName, this.instanceId));
        } else {
          return Observable.throw(error);
        }
      });
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

    const consumerRequest = {
      name: this.instanceId,
      format: 'json',
      'auto.offset.reset': autoOffsetReset,
      'auto.commit.enable': autoCommitEnable
    };
    return consumerRequest;
  }
}
