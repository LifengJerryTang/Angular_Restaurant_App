import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import {expand, flyInOut} from "../animations/app.animations";
import { baseURL } from '../shared/baseurl';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[] | undefined;
  featuredLeader: Leader | undefined;
  leadersErrMsg: string = '';

  constructor(private leaderService: LeaderService,  @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit(): void {
    // this.leaderService.getLeaders()
    //   .then((leaders) => this.leaders = leaders);
    // this.leaderService.getFeaturedLeader()
    //   .then((leader) => this.featuredLeader = leader);
    this.leaderService.getLeaders()
      .subscribe((leaders) => this.leaders = leaders);
    this.leaderService.getFeaturedLeader()
      .subscribe((leader) => this.featuredLeader = leader,
        errmess => this.leadersErrMsg = errmess);
  }

}
