/**
 * Created by lnthao on 8/24/2017.
 */
import { sandboxOf } from 'angular-playground';
import { PersonDetailsComponent } from './person-details.component';

export default sandboxOf(PersonDetailsComponent)
  .add('person with name and twitter', {
    template: '<app-person-details [person]="person"></app-person-details>',
    context: {
      person: {
        fullName: 'Tom Hardy',
        twitterHandle: 'mjones'
      }
    }
  })
  .add('person with name', {
    template: '<app-person-details [person]="person"></app-person-details>',
    context: {person: {fullName: 'Mike Jones'}}
  });
