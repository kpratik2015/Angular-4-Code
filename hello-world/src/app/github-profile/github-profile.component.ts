import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})

// in order to get access to route parameters we need to inject
// ActivatedRoute
export class GithubProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }


  /*
  Why is paramMap observable?
  In Angular, it does not makes sense to destroy one component when navigating
  to another component. That's why there is one component and several
  route parameters.

  An observable is basically a collection of asynchronous data that
  arrives overtime.
  */

  ngOnInit() {
    console.log("GitHubProfile OnInit");

    // when you don't want user to stay on the same page and navigate
    // back and forth. Then we use snpashot

    let id = this.route.snapshot.paramMap.get('id'); // now this paramMap is the actual object and not observable
    console.log(id);
    
    // this.route.paramMap
    //   .subscribe(params => {
    //     // console.log(params);
    //     // params.keys // returns all the keys or route params
    //     // params.get('id'); // returns string
    //     let id = +params.get('id'); // the + converts to integer
    //     console.log(id);
    //   });
    // paramMap gives all the parameters. Type is Observable<ParamMap>
  }

}
