import {Routes} from "@angular/router";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {EventsListComponent} from "./events/events-list.component";
import {CreateEventComponent} from "./events/create-event.component";
import {Error404Component} from "./errors/404.component";
import {EventRouteActivator} from "./events/shared/event-route-activator.service";

/**
 * Created by nctuong on 4/14/2017.
 */

export const appRoutes: Routes = [
  {path: "events", component: EventsListComponent },
  {path: "404", component: Error404Component},
  {path: "events/create", component: CreateEventComponent},
  {path: "events/:id", component: EventDetailsComponent, canActivate: [EventRouteActivator]},
  {path: "", redirectTo: "events", pathMatch: "full"},
];
