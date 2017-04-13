/**
 * Created by nctuong on 4/12/2017.
 */

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {EventsAppComponent} from "./events-app.component";
import {EventThumbnail} from "./events/event-thumbnail.component";
import {EventsListComponent} from "./events/events-list.component";
import {EventService} from "./events/shared/event.service";
import {NavBarComponent} from "./nav/navbar.component";

@NgModule({
  bootstrap: [EventsAppComponent],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnail,
  NavBarComponent],
  imports: [BrowserModule],
  providers: [EventService],
})
export class AppModule { }
