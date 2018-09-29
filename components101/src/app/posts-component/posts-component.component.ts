import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css']
})
export class PostsComponentComponent implements OnInit {

  posts: any[];
  
  constructor(private service: PostService) { // decorate with private keyword so it is available to other functions
    // LESSON: do not call http services in constructor. Use ngOnInit
  } // we use this http class to get data from backend

  createPost(inputTitle : HTMLInputElement) {
    let post = { title: inputTitle.value}
    inputTitle.value = '';
    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id; // post.id gives compilation error. For this we can also do let post: any
          this.posts.splice(0,0,post); // adds our post to first position
          // console.log(response.json());
        },
        (error: AppError) => {
          if(error instanceof BadInput) {
            // this.form.setErrors(error.originalError) // show error msg coming from server. 
          }
          else { 
            alert('An unexpected error occurred.');
          }
        });
  }

  updatePost(post) {
    // we use the patch method to update only few properties in an object.
    // patch is not widely supported. patch can give slight performance benefit
    // NOTE: when using patch or put method we need to reference a specific post
    this.service.updatePost(post)
    .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        alert('An unexpected error occurred.');
      });
      // this.http.put(this.url, JSON.stringify(post)) // e.g. of put.
  }

  deletePost(post) {
    this.service.deletePost(455) // for seeing error.
    // this.service.deletePost(post.id)
    .subscribe(
      response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => { // whenever in arrow notation you want to use type notation then put round brackets.
        console.log(error);
        if(error instanceof NotFoundError)
          alert('This post has already been deleted.');
        else
          alert('An unexpected error occurred.');
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
    this.service.getPosts() // this component is now telling the service that hey I want posts. Get the posts somehow. Service will figure it out.
    .subscribe(
      response => {
        // console.log(response.json());
        this.posts = response.json();
      },
      // error optional parameter
      error => {
        alert('An unexpected error occurred.'); // in real world you'll use toast notification
      }); // we are subscribing to observable that means when the result is ready we'll be notified
  }

}
