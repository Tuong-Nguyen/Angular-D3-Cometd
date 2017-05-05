import {async, inject, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {ConsumerApi} from '../api/ConsumerApi';
import {Observable} from 'rxjs/Rx';
import * as HttpTestErrorHandlers from './HttpTestErrorHandlers';
import * as SystemInfo from './SystemInfo';

/**
 * Created by nctuong on 5/4/2017.
 */

describe('ConsumerApi', () => {

  const groupName = 'GroupTest';
  const instanceId = 'ConsumerTest';
  const topicName = SystemInfo.topicName;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ConsumerApi]
    }).compileComponents();
  }));

  describe('#createInstanceToGroup', () => {

    it('can create an instance', (done) => {
      const consumerRequest = {
        name: 'ConsumerTest',
        format: 'json',
        'auto.offset.reset': 'earliest',
        'auto.commit.enable': 'false'
      };
      const service = TestBed.get(ConsumerApi);
      service.createInstanceToGroup('GroupTest', consumerRequest)
        .subscribe(
          (response) => {
            expect(response.base_uri).toContain(consumerRequest.name);
            done();
          },
          (error) => {
            expect(error.status).toBe(409);
            done();
          }
        );
    });
  });

  describe('#getMessage', () => {
    it('can get message', (done) => {
      const service = TestBed.get(ConsumerApi);

      const consumerRequest = {
        name: instanceId,
        format: 'json',
        'auto.offset.reset': 'latest',
        'auto.commit.enable': 'true'
      };

      service.createInstanceToGroup(groupName, consumerRequest)
        .map(response => response.instance_id)
        .catch((error: Response) => {
          if (error.status === 409) {
            return Observable.of(consumerRequest.name);
          } else {
            Observable.throw(error.status);
          }
        })
        .flatMap((name) => service.subscribesTopics(groupName, name, {topics: [topicName]}))
        .flatMap(item => service.fetchData(groupName, consumerRequest.name))
        .subscribe(
          response => {
            expect(response).toBeDefined();
            done();
          },
          HttpTestErrorHandlers.failOnError
        );
    }, 10000);
  });

  describe('#destroyConsumer', () => {

    it('can delete the consumer instance', (done) => {
      const service = TestBed.get(ConsumerApi);
      service.destroyConsumer(groupName, instanceId)
        .subscribe(
          response => {
            expect(response).toBeUndefined();
            done();
          },
          (error: Response) => {
            expect(error.status).toBe(404);
            done();
          }
        );
    });
  });
});
