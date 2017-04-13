import {Component} from "@angular/core";
/**
 * Created by nctuong on 4/13/2017.
 */
@Component({
  selector: "nav-bar",
  styles: [`
    .nav.navbar-nav { font-size: 15px; }
    #searchForm {magin-right: 100px}
    @media (max-width: 1200px) {#searchForm {display: none}}
  `],
  templateUrl: "app/nav/navbar.component.html",
})
export class NavBarComponent {

}
