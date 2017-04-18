/**
 * Created by lnthao on 4/13/2017.
 */
import {Observable} from "rxjs";
import {load} from "./loader"

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
