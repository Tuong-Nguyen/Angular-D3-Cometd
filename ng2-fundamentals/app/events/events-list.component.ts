import {Component, OnInit} from "@angular/core";
import {EventService} from "./shared/event.service";
/**
 * Created by nctuong on 4/12/2017.
 */
@Component({
  selector: "events-list",
  templateUrl: "app/events/events-list.component.html",
})
export class EventsListComponent implements OnInit {
  public events: any[];

  constructor(private eventList: EventService) {

  }

  public ngOnInit() {
    this.events = this.eventList.getEvents();
  }
}
