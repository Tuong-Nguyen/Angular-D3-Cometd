import {TestBed} from '@angular/core/testing';
import {KafkaProxyService} from './kafka-proxy.service';
import {HttpModule, Http} from '@angular/http';
import {TopicApi} from '../kafka-rest/api/TopicApi';
import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';
import {BASE_PATH} from '../kafka-rest/variables';
import {KafkaProxyConfiguration} from './kafka-configuration';


fdescribe('KafkaProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        KafkaProxyService,
        TopicApi,
        {provide: BASE_PATH, useValue: 'http://11.11.254.102:8082'}
      ]
    });
  });

  describe('#constructor', () => {
    it('without Configuration set true for AutocommitEnable and latest for AutoOffsetReset', () => {
      const service = TestBed.get(KafkaProxyService);
      expect(service.Configuration.AutoOffsetReset).toBe(AutoOffsetResetEnum.Latest);
      expect(service.Configuration.AutoCommitEnable).toBe(true);
    });

    it('with Configuration use the Configuration object', () => {
      const config = new KafkaProxyConfiguration();
      const service = new KafkaProxyService(TestBed.get(Http), config);
      expect(service.Configuration).toBe(config);
    });
  });

  describe('#sendData', () => {
    it('send a message return the offset of the message in the topic', (done) => {
      const service = TestBed.get(KafkaProxyService);
      const data = {
        id: 10,
        name: 'hello'
      };
      service.sendData('TestTopic', data)
        .subscribe(
          response => {
            expect(response.offsets.length).toBe(1);
            done();
          },
          error => {
            fail(error);
            done();
          }
        );
    }, 2000);
  });

});
