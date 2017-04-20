/**
 * Created by lnthao on 4/13/2017.
 */
import {Observable, Scheduler} from "rxjs";
import {load} from "./loader";
import {} from "./petstore";

let output = document.getElementById("output");
let button = document.getElementById("getBtn");

let click = Observable.fromEvent(button, "click");

// render the movies
function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

var merged = load("data/movies.json").merge(load("data/movies_plus.json"));
// transform emitting item from load's observable to click's observable
click.flatMap(e => merged)
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );

var observable = Observable.range(1, 10)
    .scan((acc, x) => { return acc + x; })
    .observeOn(Scheduler.async);

var observable2 = Observable.range(1, 5)
    .subscribeOn(Scheduler.asap);

var scheduleObserver = {
    next: (value) => {
        Scheduler.async.schedule(
            (x) => observer.next(x),
            0 /* delay */,
            value * 2 /* will be the x for the function above */
        );
        console.log(`schedule value: ${value} at ${new Date()}`);
    },
    error: (e) => {
        console.log(`error: ${e}`);
    },

    complete: () => {
        console.log(`schedule done`);
    }
}

var observer = {
    next: x => console.log(`value: ${x} at ${new Date()}`),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
};
// console.log('before subscribe 1');
// observable.subscribe(scheduleObserver);
// console.log('after subscribe 1');

console.log('before subscribe 2');
observable2.subscribe(scheduleObserver);
console.log('after subscribe 2');
