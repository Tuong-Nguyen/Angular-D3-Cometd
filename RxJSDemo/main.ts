/**
 * Created by lnthao on 4/13/2017.
 */
import {Observable} from "rxjs";

/* Cold observable */

// let numbers = [1, 2, 5];
// let source = Observable.from(numbers);
//
// class MyObserver {
//     next(value) {
//         console.log(`value: ${value}` );
//     }
//
//     error(e) {
//         console.log(`error: ${e}`);
//     }
//
//     complete() {
//         console.log(`completed`);
//     }
// }
// source.subscribe(new MyObserver());
// numbers.push(4);
//
// console.log('Current time: ' + Date.now());

/* Hot observable */

// Creates a sequence
let source = Observable.interval(1000);

// Convert the sequence into a hot sequence
let hot = source.publish();

// No value is pushed to 1st subscription at this point
let subscription1 = hot.subscribe(
    (x) => { console.log('Observer 1: onNext: %s', x); },
    (e) => { console.log('Observer 1: onError: %s', e); },
    () => { console.log('Observer 1: onCompleted'); });

hot.connect();

// delay 1,5s to subscribe
var subscription2 = hot.delay(1500).subscribe(
    (x) => { console.log('Observer 2: onNext: %s', x); },
    (e) => { console.log('Observer 2: onError: %s', e); },
    () => { console.log('Observer 2: onCompleted'); });
