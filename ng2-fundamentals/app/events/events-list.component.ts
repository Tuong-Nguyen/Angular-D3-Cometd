import {Component} from "@angular/core";
/**
 * Created by nctuong on 4/12/2017.
 */
@Component({
  selector: "events-list",
  templateUrl: "app/events/events-list.component.html",
})
export class EventsListComponent {
  public event = {
    id: 1,
    name: "Angular Conect",
    date: "9/26/2036",
    time: "10:00 AM",
    price: 599.99,
    imageUrl: "/app/assets/images/angularconnect-shield.png",
    location: {
      address: "1057 DT",
      city: "London",
      country: "England",
    },
  };
}
