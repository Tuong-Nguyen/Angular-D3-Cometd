/**
 * Created by nctuong on 4/12/2017.
 */

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {EventsAppComponent} from "./events-app.component";

@NgModule({
  bootstrap: [EventsAppComponent],
  declarations: [EventsAppComponent],
  imports: [BrowserModule],
})
export class AppModule { }
