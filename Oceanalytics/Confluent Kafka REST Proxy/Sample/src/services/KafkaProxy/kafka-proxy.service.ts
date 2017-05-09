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

@Injectable()
export class KafkaProxyService {
  private topicApi: TopicApi;
  private consumerApi: ConsumerApi;
  public readonly Configuration: KafkaProxyConfiguration;

  constructor(topicApi: TopicApi, consumerApi: ConsumerApi, @Optional() configuration: KafkaProxyConfiguration) {
    this.topicApi = topicApi;
    this.consumerApi = consumerApi;

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

  public readData(topicName: string): Observable<Array<RecordInfo>> {
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
      name: 'ConsumerTest',
      format: 'json',
      'auto.offset.reset': autoOffsetReset,
      'auto.commit.enable': autoCommitEnable
    };

    const groupName = consumerRequest.name;
    return this.consumerApi.createInstanceToGroup(groupName, consumerRequest)
      .map(response => response.instance_id)
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
}
