/**
 * Created by nctuong on 4/12/2017.
 */
import {BrowserModule} from "@angular/platform-browser";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {EventsAppComponent} from "./events-app.component";
import {EventThumbnail} from "./events/event-thumbnail.component";
import {EventsListComponent} from "./events/events-list.component";
import {EventService} from "./events/shared/event.service";
import {NgModule} from "@angular/core";
import {ToastrService} from "./common/toastr.service";

import {NavBarComponent} from "./nav/navbar.component";

@NgModule({
  bootstrap: [EventsAppComponent],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnail,
    NavBarComponent,
    EventDetailsComponent,
  ],
  imports: [BrowserModule],
  providers: [
    EventService,
    ToastrService,
  ],
})
export class AppModule { }
