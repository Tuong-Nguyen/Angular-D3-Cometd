import {Component} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by nctuong on 4/14/2017.
 */
@Component({
  templateUrl: "app/events/create-event.component.html"
})
export class CreateEventComponent {
  constructor(private router:Router){}

  public cancel (){
    this.router.navigate(["/events"]);
  }
}
