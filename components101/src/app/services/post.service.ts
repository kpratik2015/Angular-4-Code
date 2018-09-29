import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/throw';
import { DataService } from './data.service';

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

export class PostService extends DataService {

  // private url = 'http://jxfdfxfr.typicode.com/posts'; // to check unexpected error
   // we want this visible only in this class

  constructor(http: Http) {
    super('http://jsonplaceholder.typicode.com/posts',http);
  }

  // WE CAN QUICKLY JUMP TO FUNCTIONS WITH SHIFT + CTRL + O
}
