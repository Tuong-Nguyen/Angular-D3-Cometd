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
import {Error404Component} from "./errors/404.component";
import {EventRouteActivator} from "./events/shared/event-route-activator.service";

@NgModule({
  bootstrap: [EventsAppComponent],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnail,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
  ],
})
export class AppModule { }
