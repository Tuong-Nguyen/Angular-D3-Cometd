/**
 * Created by lnthao on 4/13/2017.
 */
import {Observable} from "rxjs";

let numbers = [1, 2, 5];
let source = Observable.from(numbers);

class MyObserver {
    next(value) {
        console.log(`value: ${value}` );
    }

    error(e) {
        console.log(`error: ${e}`);
    }

    complete() {
        console.log(`completed`);
    }
}
source.subscribe(new MyObserver());
numbers.push(4);

console.log('Current time: ' + Date.now());
