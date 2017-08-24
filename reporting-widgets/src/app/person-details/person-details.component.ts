/**
 * Created by lnthao on 8/24/2017.
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
@Component({
  selector: 'app-person-details',
  template: `
    {{person.fullName}} <span *ngIf="person.twitterHandle">(<a href="#">{{person.twitterHandle}}</a>)</span>
    Leave a comment: <input type="text">
  `,
  styles: [`
    :host{ font-weight: bold;}
    :host input { width: 98%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailsComponent {
  @Input() person;
}
