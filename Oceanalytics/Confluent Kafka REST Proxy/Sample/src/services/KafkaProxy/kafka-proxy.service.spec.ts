import {TestBed} from '@angular/core/testing';
import {KafkaProxyService} from './kafka-proxy.service';
import {HttpModule, Http} from '@angular/http';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';
import {BASE_PATH} from '../kafka-rest/variables';
import {KafkaProxyConfiguration} from './kafka-configuration';
import {ConsumerApi} from '../kafka-rest/api/ConsumerApi';
import {ArrayMatcher} from '../../tests/utils/array-matcher';


describe('KafkaProxyService', () => {
  let service: KafkaProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        KafkaProxyService,
        TopicApi,
        ConsumerApi,
        {provide: BASE_PATH, useValue: 'http://11.11.254.102:8082'}
      ]
    });
    service = TestBed.get(KafkaProxyService);
  });

  describe('#constructor', () => {
    it('without Configuration set true for AutocommitEnable and latest for AutoOffsetReset', () => {
      expect(service.Configuration.AutoOffsetReset).toBe(AutoOffsetResetEnum.Latest);
      expect(service.Configuration.AutoCommitEnable).toBe(true);
    });

    it('with Configuration use the Configuration object', () => {
      const config = new KafkaProxyConfiguration();
      const serviceTest = new KafkaProxyService(TestBed.get(TopicApi), TestBed.get(ConsumerApi), config);
      expect(serviceTest.Configuration).toBe(config);
    });
  });

  describe('#sendData', () => {
    function sendDataTest(data: any, done) {
      service.sendData('TestTopic', data)
        .subscribe(
          offsets => {
            console.log(offsets);
            expect(offsets.offsets.length).toBe(1);
            done();
          },
          error => {
            fail(error);
            done();
          }
        );
    }

    it('send a json object return the offset of the message in the topic', (done) => {
      const data = {
        id: 10,
        name: 'hello'
      };
      sendDataTest(data, done);
    }, 2000);

    it('send a number return the offset of the message in the topic', (done) => {
      const data = 10;
      sendDataTest(data, done);
    }, 2000);

    it('send a string return the offset of the message in the topic', (done) => {
      const data = 'test';
      sendDataTest(data, done);
    }, 2000);
  });

  fdescribe('#readData', () => {
    
  });
});
