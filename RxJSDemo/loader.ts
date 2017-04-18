/**
 * Created by lnthao on 4/18/2017.
 */

import {Observable} from "rxjs"

// return an observable for data stream
export function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", ()=> {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy({attempts: 3, delay: 1500}));

}

function retryStrategy({attempts = 4, delay = 1000}) {
    return function(errors) {
        return errors
            .scan((accumulator, value) => {
                console.log(accumulator, value);
                return accumulator + 1;
            }, 0)
            .takeWhile(accumulator => accumulator < attempts)
            .delay(delay);
    }
}