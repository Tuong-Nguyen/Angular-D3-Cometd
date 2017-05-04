/**
 * Created by nctuong on 5/3/2017.
 */
import {TopicApi} from './../api/TopicApi';
import {HttpModule} from '@angular/http';
import {async, inject, TestBed} from '@angular/core/testing';
import {ProduceMessages} from './../model/ProduceMessages';
import {Record} from './../model/Record';


describe('TopicApi', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [TopicApi]
    }).compileComponents();
  }));

  describe('#produceMessageToTopic', () => {

    it('send a message return the offset of the message in the topic', async(() => {
      inject([TopicApi], (topicApi) => {
        const record: Record = {
          value: 'This is a message from test'
        };
        const records: ProduceMessages = {
          records: [record]
        };
        topicApi.produceMessageToTopic('testTopic', records)
          .subscribe((result) => {
            expect(result).toBeDefined();
            expect(result.offsets.length).toBe(1);
          });
      })();
    }));
  });

  describe('#GetTopic', () => {
    it('return list topics which has "__consumer_offsets" topic', async(() => {
      inject([TopicApi], (service) => {
        service.getTopics().subscribe((response) => {
          expect(response).toContain('__consumer_offsets');
        });
      })();
    }));
  });
});
