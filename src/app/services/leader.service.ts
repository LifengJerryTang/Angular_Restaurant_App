import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import {Observable, of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private httpClient: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS), 2000);
    // });
    // return of(LEADERS).pipe(delay(2000));
    return this.httpClient.get<Leader[]>(baseURL + 'leadership')
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    // });
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.httpClient.get<Leader>(baseURL + 'leadership/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), 2000);
    // });
    // return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000));
    return this.httpClient.get<Leader>(baseURL + 'leadership?featured=true')
            .pipe(map((leaders: any) => leaders[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
