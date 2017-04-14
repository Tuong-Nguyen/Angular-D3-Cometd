import {Component, OnInit} from "@angular/core";
import {EventService} from "./shared/event.service";
import {ToastrService} from "../common/toastr.service";
/**
 * Created by nctuong on 4/12/2017.
 */
@Component({
  selector: "events-list",
  templateUrl: "app/events/events-list.component.html",
})
export class EventsListComponent implements OnInit {
  public events: any[];

  constructor(private eventList: EventService, private toastr: ToastrService) {

  }

  public ngOnInit() {
    this.events = this.eventList.getEvents();
  }

  public handleThumbnailClick(eventName: string) {
    this.toastr.success(eventName);
  }
}
