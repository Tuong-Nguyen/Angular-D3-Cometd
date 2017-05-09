import {Injectable, Optional} from '@angular/core';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {KafkaProxyConfiguration} from './kafka-configuration';
import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';
import {ProduceMessages} from '../kafka-rest/model/ProduceMessages';
import {Record} from '../kafka-rest/model/Record';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class KafkaProxyService {
  private topicApi: TopicApi;
  public readonly Configuration: KafkaProxyConfiguration;

  constructor(topicApi: TopicApi, @Optional() configuration: KafkaProxyConfiguration) {
    this.topicApi = topicApi;
    if (configuration) {
      this.Configuration = configuration;
    } else {
      this.Configuration = new KafkaProxyConfiguration();
      this.Configuration.AutoOffsetReset = AutoOffsetResetEnum.Latest;
      this.Configuration.AutoCommitEnable = true;
    }
  }

  public sendData(topicName: string, jsonData: any): Observable<Response> {
    const record: Record = {
      value: jsonData
    };
    const records: ProduceMessages = {
      records: [record]
    };

    return this.topicApi.produceMessageToTopic(topicName, records);
  }
}
