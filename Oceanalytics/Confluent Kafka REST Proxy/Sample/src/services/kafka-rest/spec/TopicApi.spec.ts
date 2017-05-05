/**
 * Created by nctuong on 5/3/2017.
 */
import {TopicApi} from './../api/TopicApi';
import {HttpModule} from '@angular/http';
import {async, TestBed} from '@angular/core/testing';
import {ProduceMessages} from './../model/ProduceMessages';
import {Record} from './../model/Record';
import * as HttpTestErrorHandlers from './HttpTestErrorHandlers';
import * as SystemInfo from './SystemInfo';


describe('TopicApi', () => {
  const topicName = SystemInfo.topicName;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [TopicApi]
    }).compileComponents();
  }));

  describe('#produceMessageToTopic', () => {

    it('send a message return the offset of the message in the topic', (done) => {
      const service = TestBed.get(TopicApi);
      const record: Record = {
        value: '{hello: "test"}'
      };
      const records: ProduceMessages = {
        records: [record]
      };

      service.produceMessageToTopic(topicName, records)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(result.offsets.length).toBe(1);
            done();
          },
          error => {
            done();
          });
    }, 5000);
  });

  describe('#GetTopic', () => {
    it('return list topics which has "__consumer_offsets" topic', (done) => {
      const service = TestBed.get(TopicApi);
      service.getTopics().subscribe((response) => {
          expect(response).toContain('__consumer_offsets');
          done();
        },
        HttpTestErrorHandlers.failOnError);
    });
  });
});
