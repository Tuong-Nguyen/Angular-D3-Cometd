import {async} from '@angular/core/testing';
import {Observable} from 'rxjs/Rx';
/**
 * Created by nctuong on 5/4/2017.
 */

describe('ReactiveX', () => {

  describe('#map', () => {
    it('only handle items in response', (done) => {
      Observable.throw('error').map(item => 'mapper').subscribe(
        item => {
          fail();
          done();
        },
        error => {
          expect(error).toBe('error');
          done();
        }
      );
    });
  });

  describe('#catch', () => {
    it('convert error into items for response', (done) => {
      Observable.throw('error').catch(error => {
        return Observable.of('handledError');
      }).subscribe(
          response => {
            expect(response).toBe('handledError');
            done();
          },
        error => {
          fail(error);
          done();
        }
        );
    });

    it('forward items to subscriber', ((done) => {
      Observable.of('item').catch(error => Observable.of('error'))
        .subscribe(
          response => {
            expect(response).toBe('item');
            done();
          },
          error => {
            fail(error);
            done();
          }
        );
    }));

    it('forward items to subscriber and transform error before forward to subscriber', (done) => {
      Observable.of('item').concat(Observable.throw('test'))
        .catch(error => Observable.of(''))
        .subscribe(
          (item) => {
            expect(['item', '']).toContain(item);
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
