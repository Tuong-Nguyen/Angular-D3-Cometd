/**
 * Created by lnthao on 4/13/2017.
 */
import {Observable} from "rxjs";

let output = document.getElementById("output");
let button = document.getElementById("getBtn");

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", ()=> {
       let movies = JSON.parse(xhr.responseText);
       movies.forEach(m => {
           let div = document.createElement("div");
           div.innerText = m.title;
           output.appendChild(div);
       });
    });
    xhr.open("GET", url);
    xhr.send();
}

click.subscribe(
    x => load("data/movies.json"),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
)