/**
 * Created by nctuong on 4/12/2017.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {ToastrService} from "./common/toastr.service";
import {EventsAppComponent} from "./events-app.component";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {EventThumbnail} from "./events/event-thumbnail.component";
import {EventsListComponent} from "./events/events-list.component";
import {EventService} from "./events/shared/event.service";
import {NavBarComponent} from "./nav/navbar.component";
import {appRoutes} from "./routes";
import {CreateEventComponent} from "./events/create-event.component";

@NgModule({
  bootstrap: [EventsAppComponent],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnail,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    EventService,
    ToastrService,
  ],
})
export class AppModule { }
