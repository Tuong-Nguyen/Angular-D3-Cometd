import {Observable, TimeInterval, Timestamp} from 'rxjs/Rx';
import {ArrayMatcher} from './utils/array-matcher';


/**
 * Created by QuanLe on 5/4/2017.
 */

describe('ReactiveX', () => {
  describe('#map', () => {
    it('test', (done) => {
      const values = [1, 2, 3];
      Observable.from(values)
        .flatMap(value => Observable.range(0, value))
        .count()
        .subscribe(
          response => {
            expect(response).toBe(6);
            done();
          },
          error => {
            fail(error);
            done();
          }
        );
    });
  });

  describe('#unsubscribe', () => {
    it('does not receive items any more', (done) => {
      const data: number[] = [];
      const observable = Observable.interval(100);
      const subscription = observable.subscribe(
        item => data.push(item)
      );
      Observable.timer(1000).subscribe(
        item => {
          subscription.unsubscribe();
        },
        error => {
          fail(error);
          done();
        }
      );
      Observable.timer(3000).subscribe(
        item => {
          exports(data.length).toBe(9);
          done();
        },
        error => {
          fail(error);
          done();
        }
      );
    }, 4000);
  });

  describe('#interval', () => {
    it('emit numbers from 0 every interval', (done) => {
      const list: number[] = [];
      const subscription = Observable.interval(10)
        .reduce((acc, item, index) => {
          acc.push(item);
          return acc;
        }, list)
        .subscribe();

      Observable.timer(100)
        .subscribe(
          item => {
            subscription.unsubscribe();
            const expected: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const result = ArrayMatcher.isSame<number>(list, expected);
            if (result.result === false) {
              fail(result.error);
            }
            done();
          }
        );
    });
  });

  describe('#concatmap', () => {
    it('subscribes the next Observable after the previous Observable completes', (done) => {
      const output: Timestamp<number>[] = [];
      Observable.range(0, 2)
        .concatMap(item => Observable.timer(100))
        .timestamp()
        .subscribe(
          response => {
            output.push(response);
          },
          error => {
            fail(error);
            done();
          },
          () => {
            const eslapsedTime = output[1].timestamp - output[0].timestamp;
            expect(eslapsedTime).toBeGreaterThanOrEqual(100);
            done();
          }
        );
    });

    // fit('sequentially create & subscribes Obse rvable124s', (done) => {
    //   const output: Timestamp<number>[] = [];
    //   let lastItemAt: number = Date.now() - 100;
    //   let lastExecutedAt: number = Date.now() - 100;
    //   Observable.range(0, 5)
    //     .concatMap(item => {
    //       if (Date.now() - lastItemAt >= 100) {
    //         lastItemAt = Date.now();
    //         Observable.defer(() => {
    //           lastExecutedAt = Date.now();
    //           return Observable.of(item).delay(100);
    //         });
    //       } else {
    //         return Observable.empty();
    //       }
    //     })
    //     .timestamp()
    //     .subscribe(
    //       response => {
    //         console.log(response);
    //         output.push(response);
    //       },
    //       error => {
    //         fail(error);
    //         done();
    //       },
    //       () => {
    //         console.log(output);
    //         done();
    //       }
    //     );
    // });
  });

  describe('work', () => {

    function work(itemCount: number, firstInterval: number, secondInterval: number, expectedItemCount: number,
                  expectedInterval: number, done) {
      const finalItems: TimeInterval<number>[] = [];
      let isRunning = false;
      Observable.interval(firstInterval)
        .take(itemCount)
        .concatMap(item => {
          // if (isRunning === false) {
          //   const startObserable = Observable.create((observable) => {
          //     isRunning = true;
          //     observable.complete();
          //   });
          //   const endObserable = Observable.create((observable) => {
          //     isRunning = false;
          //     observable.complete();
          //   });
          //   return startObserable.concatMapTo(Observable.timer(secondInterval)).concatMapTo(endObserable);
          // } else {
          //   return Observable.empty();
          // }

          return Observable.timer(secondInterval);
        })
        .timeInterval()
        .reduce((acc, item, index) => {
          acc.push(item);
          return acc;
        }, finalItems)
        .subscribe(
          items => {
            console.log(items);
            expect(items.length).toBe(expectedItemCount);
            expect(items[0].interval).toBeGreaterThanOrEqual(firstInterval + secondInterval - 1);
            for (let i = 1; i < items.length; i++) {
              expect(items[i].interval).toBeGreaterThanOrEqual(expectedInterval - 1);
            }
          },
          error => {
            fail();
            done();
          },
          () => {
            done();
          }
        );
    }

    fit('when second interval < first interval: the items are emitted in interval of first interval', done => {
      const firstInterval = 100;
      const secondInterval = 10;
      work(10, firstInterval, secondInterval, 10, firstInterval, done);
    });

    fit('when second interval > first interval: the items are emitted in interval of second interval', done => {
      const firstInterval = 10;
      const secondInterval = 100;
      const itemCount = 20;
      const expectedItemCount = 2;
      const expectedInterval = secondInterval;
      work(itemCount, firstInterval, secondInterval, expectedItemCount, expectedInterval, done);
    });
  });

});

