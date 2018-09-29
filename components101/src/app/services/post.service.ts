import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
// catch is an instance method available on observable objects
import 'rxjs/add/operator/catch'; // this will help catch errors at service level
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

// throw method is static method available on obeservable class
import 'rxjs/add/observable/throw';
// import { throwError } from 'rxjs';
// import { filter, map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root' 
})

/*
Possibilities of Errors:
UNEXPECTED:
- server is offline
- network is down i.e. client cannot reach server
- unhandled exceptions

EXPECTED:
- not found errors (404)
- bad request errors (400)
*/

export class PostService {

  private url = 'http://jsonplaceholder.typicode.com/posts'; // we want this visible only in this class

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.url); // it returns observable<Response>
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .catch((error: Response) => {
        if (error.status === 400)
          return Observable.throw(new BadInput(error.json()))
        return Observable.throw(new AppError(error.json()))
      }); // this method also returns observable
  }
  
  updatePost(post) {
    return this.http.patch(this.url+'/'+post.id, JSON.stringify({ isRead: true }));
  }

  deletePost(id) {
    return this.http.delete(this.url+'/'+id)
      .catch((error:Response) => {
        if (error.status === 404){
          // console.log(error.status);
          return Observable.throw(new NotFoundError()); // static method
        }
        return Observable.throw(new AppError(error));
      });
  }

}
