import {Routes} from "@angular/router";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {EventsListComponent} from "./events/events-list.component";
import {CreateEventComponent} from "./events/create-event.component";

/**
 * Created by nctuong on 4/14/2017.
 */

export const appRoutes: Routes = [
  {path: "events", component: EventsListComponent },
  {path: "events/create", component: CreateEventComponent},
  {path: "events/:id", component: EventDetailsComponent},
  {path: "", redirectTo: "events", pathMatch: "full"},
];
