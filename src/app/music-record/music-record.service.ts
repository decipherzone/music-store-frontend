import {Http} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/filter';
import {CommonhttpServices} from '../lib/commonhttp.services';
import {Observable} from '../../../node_modules/rxjs';
import {MusicRecord} from './music-record.component';

declare var jQuery: any;

@Injectable()
export class MusicRecordsService {

  urlMusic: string = 'music';

  constructor(private commonHttpServices: CommonhttpServices, @Inject(Http) private http: Http, @Inject(Router) private router: Router) {
  }

  public getAllRecords(): Observable<any> {
    return this.commonHttpServices.authGet(this.urlMusic);
  }

  public updateMusicRecord(musicRecord: MusicRecord): Observable<any> {
    return this.commonHttpServices.authPutData(this.urlMusic, musicRecord);
  }

  public addMusicRecord(musicRecord: MusicRecord): Observable<any> {
    return this.commonHttpServices.postJSON(this.urlMusic, musicRecord);
  }

}
