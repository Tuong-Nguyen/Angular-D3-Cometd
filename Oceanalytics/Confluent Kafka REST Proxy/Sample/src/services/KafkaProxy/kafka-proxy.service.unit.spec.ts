import {KafkaProxyService} from './kafka-proxy.service';
import {ConsumerApi} from '../kafka-rest/api/ConsumerApi';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {Observable} from 'rxjs/Rx';
import {ConsumerResponse} from '../kafka-rest/model/ConsumerResponse';
/**
 * Created by nctuong on 5/10/2017.
 */

fdescribe('KafkaProxyService - UnitTest', () => {
  let service: KafkaProxyService;
  let mockTopicApi: TopicApi;
  let mockConsumerApi: ConsumerApi;

  beforeEach(() => {
    mockTopicApi = new TopicApi(null, null, null);
    mockConsumerApi = new ConsumerApi(null, null, null);
    service = new KafkaProxyService(mockTopicApi, mockConsumerApi, null);
  });

  describe('#subscribe', () => {
    it('same id', () => {

    });
  });

  describe('#fetch', () => {
    it('#createInstance', () => {
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{
        instance_id: 'id',
        base_uri: 'base_uri'
      }]));
      service.createConsumerInstance()
        .subscribe();

      expect(service.instanceId).toBe('id');
    });

    it('#createInstance called the second time with ID from the first result', () => {
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

    it('#subscribeTopics', () => {
      const mockResponse = new Response({}, {status: 404});
      spyOn(mockConsumerApi, 'subscribesTopics').and.returnValue(Observable.throw(mockResponse));
      spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{
        instance_id: 'id',
        base_uri: 'base_uri'
      }]));
      spyOn(service, 'createConsumerInstance').and.callThrough();
      service.subscribeTopics()
        .subscribe();

      expect((service.createConsumerInstance as any).calls.any());
      expect(service.instanceId).toBe('id');
    });
  });
});
