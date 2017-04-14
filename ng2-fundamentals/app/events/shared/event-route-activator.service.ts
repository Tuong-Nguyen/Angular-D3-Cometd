import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {EventService} from "./event.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/**
 * Created by nctuong on 4/14/2017.
 */
@Injectable()
export class EventRouteActivator implements CanActivate {
  constructor(private eventService: EventService, private router:Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    let eventExist = !!this.eventService.getEvent(route.params["id"]);
    if(!eventExist){
      this.router.navigate(["/404"]);
    }
    return eventExist;
  }
}
