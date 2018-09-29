import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';


/*
Optimistic Update: we update the UI before we get successful response from server. This makes it look smooth and with low delay. In case of failure, there is roll back.

Pessimistic Update: we don't update UI until a successful response from server.
*/
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

  // OPTIMISTIC:
  createPost(inputTitle : HTMLInputElement) {
    let post = { title: inputTitle.value}
    this.posts.splice(0,0,post);

    inputTitle.value = '';

    this.service.create(post)
      .subscribe(
        newPost => {
          post['id'] = newPost.id; // post.id gives compilation error. For this we can also do let post: any
        },
        (error: AppError) => {
          this.posts.splice(0,1);

          if(error instanceof BadInput) {
            // this.form.setErrors(error.originalError) // show error msg coming from server. 
          }
          else throw error; // we need to throw so that our global handler handles this error.
        });
  }

  // PESSIMISTIC:
  // createPost(inputTitle : HTMLInputElement) {
  //   let post = { title: inputTitle.value}
  //   inputTitle.value = '';
  //   this.service.create(post)
  //     .subscribe(
  //       newPost => {
  //         post['id'] = newPost.id; // post.id gives compilation error. For this we can also do let post: any
  //         this.posts.splice(0,0,post); // adds our post to first position
  //         // console.log(response.json());
  //       },
  //       (error: AppError) => {
  //         if(error instanceof BadInput) {
  //           // this.form.setErrors(error.originalError) // show error msg coming from server. 
  //         }
  //         else throw error; // we need to throw so that our global handler handles this error.
  //       });
  // }

  updatePost(post) {
    // we use the patch method to update only few properties in an object.
    // patch is not widely supported. patch can give slight performance benefit
    // NOTE: when using patch or put method we need to reference a specific post
    this.service.update(post)
    .subscribe(
      updatedPost => {
        console.log(updatedPost);
      });
      // this.http.put(this.url, JSON.stringify(post)) // e.g. of put.
  }
  // OPTIMISTIC:
  // OBSERVABLE
  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    // this.service.deletePost(455) // for seeing error.
    this.service.delete(post.id)
    .subscribe(
      null
      // () => { // empty paranthesis because we don't get anything in return
        
      // }
      ,
      (error: AppError) => { // whenever in arrow notation you want to use type notation then put round brackets.
        this.posts.splice(index, 0, post); // rolling back change in case of failure
        
        if(error instanceof NotFoundError)
          alert('This post has already been deleted.');
        else throw error;
      });
  }

  // PROMISE
  // deletePost(post) {
  //   // promises have then and catch
  //   this.service.delete(post.id); 
  // }

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

  NOTE:
  if we don't subscribe and simply call this.service.delete(post.id);
  for e.g. then the request will not reach our backend. 
  Only on calling subscribe will the backend get the request (this is visible in network tab).

  OBSERVABLES are lazy. That is, nothing happens until you subscribe to them.
  PROMISES are eager. As soon as you create a promise, the code is executed.
  */
  ngOnInit() {
    // We use observables to work with asynchronous i.e. non-blocking operations
    this.service.getAll() // this component is now telling the service that hey I want posts. Get the posts somehow. Service will figure it out.
    .subscribe( posts => this.posts = posts ); // we are subscribing to observable that means when the result is ready we'll be notified
  }

}
