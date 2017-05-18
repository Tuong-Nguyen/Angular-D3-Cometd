import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClientService {
  constructor(private http: Http) {
  };

  /**
   * @Description: create a new instance
   * @param groupName
   * @param data
   */
  createInstance(groupName, data): Observable<any> {
    const apiUrl = environment.server + '/consumers/' + groupName;
    const headers = new Headers({
      'Content-Type': 'application/vnd.kafka.json.v2+json',
      'Accept': 'application/vnd.kafka.v2+json'
    });
    const options = new RequestOptions({headers: headers});

    return this.http.post(apiUrl, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * @Description subcribe a topic
   * @param urlInstance
   * @param data
   * @returns {Observable<R|T>}
   */
  subscribeTopic(urlInstance, data): Observable<any> {
    const apiUrl = urlInstance + '/subscription';
    const headers = new Headers({'Content-Type': 'application/vnd.kafka.v2+json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(apiUrl, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || environment.generalErr));
  }

  /**
   * @Description get record from topics
   * @param urlInstance
   * @returns {Observable<R|T>}
   */
  getRecord(urlInstance): Observable<any> {
    const apiUrl = urlInstance + '/records';
    const headers = new Headers({'Accept': 'application/vnd.kafka.json.v2+json'});
    const options = new RequestOptions({headers: headers});

    return this.http.get(apiUrl, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || environment.generalErr));
  }

  addRecord(topic, data): Observable<any> {
    const apiUrl = environment.server + '/topics/' + topic;
    const headers = new Headers({
      'Content-Type': 'application/vnd.kafka.json.v2+json',
      'Accept': 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json'
    });
    const options = new RequestOptions({headers: headers});

    return this.http.post(apiUrl, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || environment.generalErr));
  }
}
