import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../shared/event.service";

/**
 * Created by nctuong on 4/14/2017.
 */
@Component({
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image {height: 200px;}
  `],
  templateUrl: "app/events/event-details/event-details.component.html",
})
export class EventDetailsComponent implements OnInit {
  public event: any;

  constructor(private eventService: EventService, private route: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.event = this.eventService.getEvent(this.route.snapshot.params["id"]);
  }

}
