import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Consumer } from 'app/server/consumer';

@Injectable()
export class ServerService {
	constructor(private http: Http) {}

	//CREATE Instance
	createInstance(groupName, data): Observable<Consumer>{
	  	let headers = new Headers({ 'Content-Type': 'application/vnd.kafka.json.v2+json', 'Accept' : 'application/vnd.kafka.v2+json'});
		let options = new RequestOptions({ headers: headers });

		let baseUrl = "http://11.11.254.102:8082";
		let url = baseUrl+"/consumers/"+ groupName;

	  	return this.http.post(url, data, options)
		     .map((res:Response) => res.json())
		     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  	};

  	//DELETE Instance
  	deleteInstance(urlInstance): Observable<any> {
  		let headers = new Headers({ 'Content-Type': 'application/vnd.kafka.v2+json'});
		let options = new RequestOptions({ headers: headers });

  		return this.http.post(urlInstance, options)
	     .map((res:Response) => res.json())
	     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  	};

  	//Subscription Topics
  	subscribe(urlInstance, data): Observable<void>{
  		let headers = new Headers({ 'Content-Type': 'application/vnd.kafka.v2+json'});
  		var options = new RequestOptions({ headers: headers });
  		let url = urlInstance + "/subscription" ;

  		return this.http.post(url, data, options)
		     .map((res:Response) => res.json())
		     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  	};

  	//POST Messages
  	addRecord(topic, data): Observable<any>{
  		let headers = new Headers({ 'Content-Type': 'application/vnd.kafka.json.v2+json', 'Accept': 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json'});
  		let options = new RequestOptions({ headers: headers });

  		let baseUrl = "http://11.11.254.102:8082";
  		let url = baseUrl + "/topics/" + topic;

  		return this.http.post(url, data, options)
		     .map((res:Response) => res.json())
		     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  	};

  	//GET Message
  	getRecords(urlInstance): Observable<any>{
  		let headers = new Headers({'Accept': 'application/vnd.kafka.json.v2+json'});
  		let options = new RequestOptions({ headers: headers });

		let url = urlInstance + "/records";

  		return this.http.get(url, options)
		     .map((res:Response) => res.json())
		     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  	}

}
