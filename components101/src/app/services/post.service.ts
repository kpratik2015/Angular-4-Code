import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
    return this.http.post(this.url, JSON.stringify(post)); // this method also returns observable
  }
  
  updatePost(post) {
    return this.http.patch(this.url+'/'+post.id, JSON.stringify({ isRead: true }));
  }

  deletePost(id) {
    return this.http.delete(this.url+'/'+id);
  }

}
