import {KafkaProxyService} from './kafka-proxy.service';
import {ConsumerApi} from '../kafka-rest/api/ConsumerApi';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {Observable} from 'rxjs/Rx';
import {ConsumerResponse} from '../kafka-rest/model/ConsumerResponse';
import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';
import {KafkaProxyConfiguration} from './kafka-configuration';
/**
 * Created by nctuong on 5/10/2017.
 */

describe('KafkaProxyService - UnitTest', () => {
  let service: KafkaProxyService;
  let mockTopicApi: TopicApi;
  let mockConsumerApi: ConsumerApi;

  beforeEach(() => {
    mockTopicApi = new TopicApi(null, null, null);
    mockConsumerApi = new ConsumerApi(null, null, null);
    service = new KafkaProxyService(mockTopicApi, mockConsumerApi, null);
  });

  describe('#sendData', () => {
    it('', () => {
      spyOn(mockTopicApi, 'produceMessageToTopic');
      service.sendData('testTopic', 'abc');
      expect(mockTopicApi.produceMessageToTopic).toHaveBeenCalledWith('testTopic', {records: [{value: 'abc'}]});
    });
  });

  describe('#sendArrayData', () => {
    it('', () => {
      spyOn(mockTopicApi, 'produceMessageToTopic');
      service.sendArrayData('testTopic', ['abc', 'xyz']);
      expect(mockTopicApi.produceMessageToTopic).toHaveBeenCalledWith('testTopic', {records: [{value: 'abc'}, {value: 'xyz'}]});
    });
  });

  describe('#addTopic', () => {
    it('when Consumer Instance is not created yet, do not call Consumer Api subscribesTopics', () => {
      spyOn(mockConsumerApi, 'subscribesTopics');
      service.addTopic('test').subscribe();
      expect(mockConsumerApi.subscribesTopics).not.toHaveBeenCalled();
    });

    it('when Consumer Instance is already created, call Consumer Api subscribesTopics', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));
      service.createConsumerInstance()
        .subscribe();
      service.addTopic('test').subscribe();
      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalled();
    });

    it('when Consumer Instance is already created and topic was added, do not call Consumer Api subscribesTopics', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));
      service.createConsumerInstance()
        .subscribe();
      service.addTopic('test').subscribe();
      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalled();

      service.addTopic('test').subscribe();

      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalledTimes(1);
    });
  });

  describe('#removeTopic', () => {
    it('when Consumer Instance is not created yet, do not call Consumer Api subscribesTopics', () => {
      spyOn(mockConsumerApi, 'subscribesTopics');
      service.addTopic('test').subscribe();

      service.removeTopic('test');
      expect(mockConsumerApi.subscribesTopics).not.toHaveBeenCalled();
    });

    it('when Consumer Instance is already created, call Consumer Api subscribesTopics', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));
      service.createConsumerInstance()
        .subscribe();
      service.addTopic('test').subscribe();

      service.removeTopic('test');
      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalledTimes(2);
    });

    it('when Consumer Instance is already created and topic does not exist, do not call Consumer Api subscribesTopics', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));
      service.createConsumerInstance()
        .subscribe();
      service.removeTopic('test');

      expect(mockConsumerApi.subscribesTopics).not.toHaveBeenCalled();
    });
  });

  describe('#constructor', () => {
    it('with null Configuration use default configuration: PollingInterval = 1000 - AutoOffsetReset = Latest - AutoCommitEnable = true',
      () => {
        service = new KafkaProxyService(mockTopicApi, mockConsumerApi, null);
        expect(service.Configuration.PollingInterval).toBe(1000);
        expect(service.Configuration.AutoOffsetReset).toBe(AutoOffsetResetEnum.Latest);
        expect(service.Configuration.AutoCommitEnable).toBe(true);
      });

    it('Configuration does not define properties, use PollingInterval = 1000 - AutoOffsetReset = Latest - AutoCommitEnable = true',
      () => {
        const configuration = new KafkaProxyConfiguration();
        service = new KafkaProxyService(mockTopicApi, mockConsumerApi, null);
        expect(service.Configuration.PollingInterval).toBe(1000);
        expect(service.Configuration.AutoOffsetReset).toBe(AutoOffsetResetEnum.Latest);
        expect(service.Configuration.AutoCommitEnable).toBe(true);
      });
  });

  describe('#fetch', () => {
    describe('#createInstance', () => {
      it('instance id in response is used after that', () => {
        spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{
          instance_id: 'id',
          base_uri: 'base_uri'
        }]));
        service.createConsumerInstance()
          .subscribe();

        expect(service.instanceId).toBe('id');
      });

      it('called the second time with ID from the first result', () => {
        spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{
          instance_id: 'id',
          base_uri: 'base_uri'
        }]));
        service.createConsumerInstance()
          .subscribe();

        service.createConsumerInstance()
          .subscribe();

        expect((mockConsumerApi.createInstanceToGroup as any).calls.argsFor(1)[1].name).toBe('id');
        expect(service.instanceId).toBe('id');
      });
    });

    describe('#subscribeTopics', () => {
      it('will create the consumer instance automatically if it does not exist', () => {
        const mockResponse = new Response({}, {status: 404});
        // error on first call and success on the second
        spyOn(mockConsumerApi, 'subscribesTopics').and.returnValues(Observable.throw(mockResponse), Observable.from([{}]));
        spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{
          instance_id: 'id',
          base_uri: 'base_uri'
        }]));

        service.subscribeTopics()
          .subscribe();

        expect(mockConsumerApi.createInstanceToGroup).toHaveBeenCalled();
        expect(service.instanceId).toBe('id');
        expect(mockConsumerApi.subscribesTopics).toHaveBeenCalledTimes(2);
        expect((mockConsumerApi.subscribesTopics as any).calls.first().args[1]).toBe('');
        expect((mockConsumerApi.subscribesTopics as any).calls.mostRecent().args[1]).toBe('id');
      });

      it('throws error if it is not non-existing consumer instance error', () => {
        const mockResponse = new Response({}, {status: 500});
        // error on first call and success on the second
        spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.throw(mockResponse));

        service.subscribeTopics()
          .subscribe(
            item => {
              fail();
            },
            error => {
              expect(error.status).toBe(500);
            }
          );
      });
    });

    it('get data from consumerApi', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));
      spyOn(mockConsumerApi, 'fetchData').and.returnValue(Observable.from([[{topic: 'test', value: '123'}]]));

      service.fetch()
        .subscribe(
          recordInfos => {
            expect(recordInfos[0].topic).toBe('test');
            expect(recordInfos[0].value).toBe('123');
          }
        );
    });

    it('when consumer instance is invalid, re-create the consumer instance and subscribesTopics', () => {
      const mockResponse = new Response(null, {status: 404});
      spyOn(mockConsumerApi, 'fetchData').and.returnValues(Observable.throw(mockResponse), Observable.of([]));
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));

      service.fetch()
        .subscribe();

      expect(mockConsumerApi.createInstanceToGroup).toHaveBeenCalled();
      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalledWith(jasmine.any(String), 'test', jasmine.any(Object));
      expect((mockConsumerApi.fetchData as any).calls.mostRecent().args[1]).toEqual('test');
    });

    it('rethrow error when the error is not invalid consumer instance', () => {
      const mockResponse = new Response(null, {status: 500});
      spyOn(mockConsumerApi, 'fetchData').and.returnValue(Observable.throw(mockResponse));
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));

      service.fetch()
        .subscribe(
          item => {
            fail();
          },
          error => {
            expect(error.status).toBe(500);
          }
        );

      expect(mockConsumerApi.createInstanceToGroup).toHaveBeenCalledTimes(1);
      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalledTimes(1);
    });

    it('when consumer instance is not created, create it first then subscribesTopics', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));
      spyOn(mockConsumerApi, 'fetchData').and.returnValue(Observable.of([]));

      service.fetch()
        .subscribe(
          item => {
          },
          error => {
          }
        );

      expect(mockConsumerApi.createInstanceToGroup).toHaveBeenCalledTimes(1);
      expect(mockConsumerApi.subscribesTopics).toHaveBeenCalledWith(jasmine.any(String), 'test', jasmine.any(Object));
      expect(mockConsumerApi.fetchData).toHaveBeenCalledTimes(1);
      expect(mockConsumerApi.fetchData).toHaveBeenCalledWith(jasmine.any(String), 'test', jasmine.any(Number));
    });
  });

  describe('#poll', () => {
    it('call consumerApi fetchData every interval', (done) => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{instance_id: 'test'}]));
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.from([{}]));

      service = new KafkaProxyService(mockTopicApi, mockConsumerApi, {
        PollingInterval: 10,
        AutoCommitEnable: true,
        AutoOffsetReset: AutoOffsetResetEnum.Latest
      });

      let index = 0;
      const returnedItems = [];

      spyOn(mockConsumerApi, 'fetchData').and.callFake(() => {
        index = index + 1;
        return Observable.from([[{value: index}]]);
      });

      service.poll()
        .take(10)
        .timestamp()
        .reduce((acc, item, index) => {
          acc.push({value: item.value[0].value, timestamp: item.timestamp});
          return acc;
        }, returnedItems)
        .subscribe(
          items => {
            expect(returnedItems.length).toBe(10);
            for (let i = 0; i < returnedItems.length; i++) {
              expect(returnedItems[i].value).toBe(i + 1);
              if (i > 0) {
                expect(returnedItems[i].timestamp - returnedItems[i - 1].timestamp).toBeGreaterThanOrEqual(10);
              }
            }
            done();
          },
          error => {
            fail(error);
            done();
          }
        );
    });
  });
});



