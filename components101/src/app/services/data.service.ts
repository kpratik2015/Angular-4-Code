import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable'; // for angular 4

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
// catch is an instance method available on observable objects
import 'rxjs/add/operator/catch'; // this will help catch errors at service level
// throw method is static method available on obeservable class
import 'rxjs/add/observable/throw';
// import { throwError } from 'rxjs';
// import { filter, map, catchError } from 'rxjs/operators';

import 'rxjs/add/operator/map';

// import 'rxjs/add/operator/toPromise'; // converts observable to promise


@Injectable({
  providedIn: 'root' 
})

export class DataService {
  // making more generic
  // private url = 'http://jxfdfxfr.typicode.com/posts'; // to check unexpected error

  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
    .map(response => response.json()) // mapping to an array of JS objects
    .catch(this.handleError);  // it returns observable<Response>
    // with a map operator we can transform the items in an obervable

  }

  create(resource) {

    // throw is a factory method that we use to create new observable object.
    // return Observable.throw(new AppError()); // for testing error on server

    return this.http.post(this.url, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);  // this method also returns observable
  }
  
  update(resource) {
    return this.http
    .patch(this.url+'/'+resource.id, JSON.stringify({ isRead: true }))
    .map(response => response.json())
    .catch(this.handleError);
  }

  /*
  We can always convert observable to promise but this isn't recommended
  unless there is some strong reason.
  NOTE: promise don't have subscribe
  */

  delete(id) {
    return this.http.delete(this.url+'/'+id)
      .map(response => response.json())
      // .toPromise() // converts observable to promise
      // .retry(3) // if call to observable fails, it will retry 3 times. retry is part of reactive programming where we get more such powerful libraries
      .catch(this.handleError);  // NOTE: it's not being called. We're simple passing a reference
  }

  // it's private bcoz we don't want the consumer of this service to know
  // about this method. That is, the component should only work with
  // CRUD methods above.
  private handleError(error: Response) {

    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()))
    if (error.status === 404){
     
      return Observable.throw(new NotFoundError());  // static method
    }
    return Observable.throw(new AppError(error));
  }


  
}
