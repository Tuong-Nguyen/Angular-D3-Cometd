/**
 * Created by nctuong on 5/8/2017.
 */
import {Observable, Timestamp} from 'rxjs/Rx';
import {poll} from './ReactiveXUtils';

describe('work', () => {

  /**
   * hello
   * @param testInterval
   * @param pollingInterval
   * @param executedTime
   * @param expectedItemCount
   * @param expectedInterval
   * @param done
   */
  function work(testInterval: number, pollingInterval: number, executedTime: number, expectedItemCount: number,
                expectedInterval: number, done) {
    const finalItems: TimeInterval<number>[] = [];

    const factory = () => {
      return Observable.timer(executedTime);
    };

    const subscription = poll(pollingInterval, factory)
      .timeInterval()
      .reduce((acc, item, index) => {
        acc.push(item);
        return acc;
      }, finalItems)
      .subscribe(
        items => {
        },
        error => {
          fail();
          done();
        },
      );
    Observable.timer(testInterval)
      .subscribe(
        item => {
          subscription.unsubscribe();
          console.log(finalItems);
          expect(finalItems.length).toBe(expectedItemCount);

          for (let i = 0; i < finalItems.length; i++) {
            expect(finalItems[0].interval).toBeGreaterThanOrEqual(pollingInterval + executedTime - 1);
          }
          done();
        }
      );
  }

  fit('when second interval = 0.1 * first interval (100ms) in 1000 ms generates 10 items', done => {
    const interval = 100;
    const executedTime = 10;
    const testInterval = 1000;
    const expectedItemCount = 5;
    work(testInterval, interval, executedTime, expectedItemCount, interval, done);
  });

  fit('when second interval = 10 * first interval (10 ms) in 200 ms generates 2 items', done => {
    const interval = 10;
    const executedTime = 100;
    const testInterval = 200;
    const expectedItemCount = 1;
    work(testInterval, interval, executedTime, expectedItemCount, interval, done);
  });

  fit('when second interval = 1.5 * first interval (100 ms) in 1000 ms generate 3 items', done => {
    const interval = 100;
    const executedTime = 150;
    const testInterval = 1000;
    const expectedItemCount = 3;
    work(testInterval, interval, executedTime, expectedItemCount, interval, done);
  });
});
