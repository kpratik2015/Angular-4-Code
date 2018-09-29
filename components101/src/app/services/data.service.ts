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
@Injectable({
  providedIn: 'root' 
})

export class DataService {
  // making more generic
  // private url = 'http://jxfdfxfr.typicode.com/posts'; // to check unexpected error

  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
    .catch(this.handleError);  // it returns observable<Response>
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .catch(this.handleError);  // this method also returns observable
  }
  
  update(resource) {
    return this.http
    .patch(this.url+'/'+resource.id, JSON.stringify({ isRead: true }))
    .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url+'/'+id)
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
