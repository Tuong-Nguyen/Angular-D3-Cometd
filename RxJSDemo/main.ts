/**
 * Created by lnthao on 4/13/2017.
 */
import {Observable} from "rxjs";

let output = document.getElementById("output");
let button = document.getElementById("getBtn");

let click = Observable.fromEvent(button, "click");

// return an observable for data stream
function load(url: string) {
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

// render the movies
function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// transform emitting item from load's observable to click's observable
click.flatMap(e => load("data/moviess.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );