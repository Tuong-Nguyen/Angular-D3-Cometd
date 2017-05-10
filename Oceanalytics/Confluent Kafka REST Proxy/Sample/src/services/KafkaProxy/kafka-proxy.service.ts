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


@Injectable()
export class KafkaProxyService {
  private topicApi: TopicApi;
  private consumerApi: ConsumerApi;
  public instanceId: string;
  public readonly SubscribedTopics: string[];
  public readonly Configuration: KafkaProxyConfiguration;

  constructor(topicApi: TopicApi, consumerApi: ConsumerApi, @Optional() configuration: KafkaProxyConfiguration) {
    this.topicApi = topicApi;
    this.consumerApi = consumerApi;
    this.SubscribedTopics = [];
    this.instanceId = '';

    if (configuration) {
      this.Configuration = configuration;
    } else {
      this.Configuration = new KafkaProxyConfiguration();
      this.Configuration.AutoOffsetReset = AutoOffsetResetEnum.Latest;
      this.Configuration.AutoCommitEnable = true;
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

  public subscribe(topicName: string) {
    if (this.SubscribedTopics.indexOf(topicName) < 0) {
      this.SubscribedTopics.push(topicName);

      // Todo: subscribe if already subscribing
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

  public createConsumerInstance(): Observable<string> {
    const consumerRequest = this.getConsumerRequest();
    return this.consumerApi.createInstanceToGroup('KafkaProxy', consumerRequest)
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

  public fetch(): Observable<Array<RecordInfo>> {
    return null;
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
