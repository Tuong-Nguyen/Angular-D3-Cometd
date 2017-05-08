import {Observable} from 'rxjs/Rx';
/**
 * Created by nctuong on 5/8/2017.
 */

class PollingService<T> {
  public data: Array<T>;

  constructor(private factory: () => Observable<T>) {
    data = new Array<T>();
  }


}
