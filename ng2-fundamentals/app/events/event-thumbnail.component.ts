import {Component, EventEmitter, Input, Output} from "@angular/core";
/**
 * Created by nctuong on 4/13/2017.
 */
@Component({
  selector: "event-thumbnail",
  styles: [`
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `],
  templateUrl: "app/events/event-thumbnail.component.html",
})
export class EventThumbnail {
  @Input() public event: any;
  @Output() public eventClick = new EventEmitter();

  public handleClickMe() {
    this.eventClick.emit("data");
  }
}
