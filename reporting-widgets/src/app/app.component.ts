import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
  }

  onNavigate() {
    this._router.navigate(['/gridster']);
  }

}
