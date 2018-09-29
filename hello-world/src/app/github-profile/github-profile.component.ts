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

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        // console.log(params);
        // params.keys // returns all the keys or route params
        // params.get('id'); // returns string
        let id = +params.get('id'); // the + converts to integer
        console.log(id);
      });
    // paramMap gives all the parameters. Type is Observable<ParamMap>
  }

}
