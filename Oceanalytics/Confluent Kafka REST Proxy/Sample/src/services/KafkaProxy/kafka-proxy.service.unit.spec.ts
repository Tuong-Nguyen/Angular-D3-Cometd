import {KafkaProxyService} from './kafka-proxy.service';
import {ConsumerApi} from '../kafka-rest/api/ConsumerApi';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {Observable} from 'rxjs/Rx';
import {ConsumerResponse} from '../kafka-rest/model/ConsumerResponse';
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

  describe('#subscribe', () => {
    it('same id', () => {

    });
  });

  fdescribe('#fetch', () => {
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

    describe('#subscribeTopics', () => {
      it('will create the consumer instance automatically if it does not exist', () => {
        const mockResponse = new Response({}, {status: 404});
        // error on first call and success on the second
        spyOn(mockConsumerApi, 'subscribesTopics').and.callFake(() => {
          if ((mockConsumerApi.subscribesTopics as any).calls.count() === 1) {
            return Observable.throw(mockResponse);
          } else {
            return Observable.from([{}]);
          }
        });
        spyOn(mockConsumerApi, 'createInstanceToGroup').and.returnValue(Observable.from([{
          instance_id: 'id',
          base_uri: 'base_uri'
        }]));

        service.subscribeTopics()
          .subscribe();

        expect(mockConsumerApi.createInstanceToGroup).toHaveBeenCalled();
        expect(service.instanceId).toBe('id');
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
  });
});
