import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest'; // static method on Observable class.

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService
    ) { }

  ngOnInit() {

    // SUBSCRIBING TO MULTIPLE OBSERVABLES
    // Combine the two or more observable into one and then subscribe to this combined observable

    let obs = Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .switchMap(combined => {
        let id = combined[0].get('id');
        let page = combined[1].get('page');
        return this.service.getAll();
      }) // what we return from this map method will be an input to our subscribe method
    
      // now we don't have subscribe inside another subscribe.
      // we use map operator to transform the objects in our observables
    obs.subscribe( followers => { this.followers = followers});


    // we want array of followers and not array of observables. So we use switchMap
   
  }
}
