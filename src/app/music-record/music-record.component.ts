import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginRegistrationService} from '../login-registration/login-registration.service';
import {CommonhttpServices} from '../lib/commonhttp.services';
import {Subject} from 'rxjs/Subject';
import {MusicRecordsService} from './music-record.service';
import {DataTableDirective} from 'angular-datatables';

declare var jQuery: any;

export class MusicRecord {
  artist: string;
  title: string;
  description: string;
  id: string;
}

@Component({
  selector: 'music-record',
  templateUrl: './music-record.component.html',
  providers: [LoginRegistrationService]
})
export class MusicRecordComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  records: MusicRecord[] = [];
  private userEmail: string;
  private musicRecord: MusicRecord;

  constructor(private router: Router, private loginRegistrationService: LoginRegistrationService,
              private commonHttpServices: CommonhttpServices, private musicRecordService: MusicRecordsService) {
  }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('splash');
    this.userEmail = localStorage.getItem('userEmail');
    this.loadRecords();
  }

  loadRecords(): void {
    this.musicRecordService.getAllRecords().subscribe(response => {
        this.records = response;
        this.dtTrigger.next();
      }
    );
  }

  toggleAdd(): void {
    this.musicRecord = new MusicRecord();
    jQuery('#addMusicRecord').modal('show');
  }

  addMusicRecord(): void {
    this.musicRecordService.addMusicRecord(this.musicRecord).subscribe(response => {
      jQuery('#addMusicRecord').modal('hide');
      this.records.push(response);
      this.reRender();
      this.resetMusicRecord();
      this.loadRecords();
    });
  }

  toggleEdit(musicRecord: MusicRecord): void {
    this.musicRecord = musicRecord;
    jQuery('#editMusicRecord').modal('show');
  }

  updateMusicRecord(): void {
    this.musicRecordService.updateMusicRecord(this.musicRecord).subscribe(response => {
      jQuery('#editMusicRecord').modal('hide');
      this.loadRecords();
      this.reRender();
      this.resetMusicRecord();
    });
  }

  deleteMusicRecord(id: any) {
    console.log(id);
    this.commonHttpServices.AuthDelete(this.urlAddMusicRecord, id).subscribe(response => {
        console.log(response);
        this.getMusicRecords();
      }
    );
  }

  reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to reRender again
      this.dtTrigger.next();
    });
  }

  logout(): void {
    this.loginRegistrationService.logOut();
  }

  private resetMusicRecord(): void {
    this.musicRecord = null;
  }

}
