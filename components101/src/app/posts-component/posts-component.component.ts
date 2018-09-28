import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css']
})
export class PostsComponentComponent implements OnInit {

  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts'; // we want this visible only in this class
  constructor(private http: Http) { // decorate with private keyword so it is available to other functions
    // LESSON: do not call http services in constructor. Use ngOnInit
  } // we use this http class to get data from backend

  createPost(inputTitle : HTMLInputElement) {
    let post = { title: inputTitle.value}
    inputTitle.value = '';
    this.http.post(this.url, JSON.stringify(post)) // this method also returns observable
      .subscribe(response => {
        post['id'] = response.json().id; // post.id gives compilation error. For this we can also do let post: any
        this.posts.splice(0,0,post); // adds our post to first position
        // console.log(response.json());
      });
  }

  updatePost(post) {
    // we use the patch method to update only few properties in an object.
    // patch is not widely supported. patch can give slight performance benefit
    // NOTE: when using patch or put method we need to reference a specific post
    this.http.patch(this.url+'/'+post.id, JSON.stringify({ isRead: true }))
    .subscribe(response => {
      console.log(response.json());
    });
    // this.http.put(this.url, JSON.stringify(post)) // e.g. of put.
  }

  deletePost(post) {
    this.http.delete(this.url+'/'+post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
  }

  /*
  components have some some lifecycle hooks like ngOnInit. 
  Angular will call this speical method at specific times.
  For instance, when angualar:
  - creates a component
  - renders it
  - creates and renders its children
  - destroys a component

  Lifecycle Hooks:
  - OnInit
  - OnChanges
  - DoCheck
  - AfterContentInit
  - etc.
  */
  ngOnInit() {
    // We use observables to work with asynchronous i.e. non-blocking operations
    this.http.get(this.url) // it returns observable<Response>
    .subscribe(response => {
      // console.log(response.json());
      this.posts = response.json();
    }); // we are subscribing to observable that means when the result is ready we'll be notified
  }

}
