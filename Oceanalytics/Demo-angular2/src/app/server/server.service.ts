import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Consumer} from 'app/server/consumer';

@Injectable()
export class ServerService {
  constructor(private http: Http) {
  }

  // CREATE Instance
  createInstance(groupName, data): Observable<Consumer> {
    const headers = new Headers({
      'Content-Type': 'application/vnd.kafka.json.v2+json',
      'Accept': 'application/vnd.kafka.v2+json'
    });
    const options = new RequestOptions({headers: headers});
    const baseUrl = environment.server;
    const url = baseUrl + '/consumers/' + groupName;

    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  // DELETE Instance
  deleteInstance(urlInstance): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/vnd.kafka.v2+json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(urlInstance, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  // Subscription Topics
  subscribe(urlInstance, data): Observable<void> {
    const headers = new Headers({'Content-Type': 'application/vnd.kafka.v2+json'});
    const options = new RequestOptions({headers: headers});
    const url = urlInstance + '/subscription';

    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  // POST Messages
  addRecord(topic, data): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/vnd.kafka.json.v2+json',
      'Accept': 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json'
    });
    const options = new RequestOptions({headers: headers});

    const baseUrl = environment.server;
    const url = baseUrl + '/topics/' + topic;

    return this.http.post(url, data, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  // GET Message
  getRecords(urlInstance): Observable<any> {
    const headers = new Headers({'Accept': 'application/vnd.kafka.json.v2+json'});
    const options = new RequestOptions({headers: headers});

    const url = urlInstance + '/records';

    return this.http.get(url, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
