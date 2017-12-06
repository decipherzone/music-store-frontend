import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginRegistrationService} from '../login-registration/login-registration.service';
import {CommonhttpServices} from '../lib/commonhttp.services';
import {Subject} from 'rxjs/Subject';
import {MusicRecordsService} from './music-record.service';
import {DataTableDirective} from 'angular-datatables';
import {CustomType} from '../lib/custom-type';

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
  userEmail: string;
  musicRecord: MusicRecord = new MusicRecord();
  clickedRowIndex: number;

  constructor(private router: Router, private loginRegistrationService: LoginRegistrationService,
              private commonHttpServices: CommonhttpServices, private musicRecordService: MusicRecordsService) {
  }

  ngOnInit() {
    this.dtOptions = {
      columns: [{
        title: 'Title',
        data: 'title'
      }, {
        title: 'Artist',
        data: 'artist'
      }, {
        title: 'Description',
        data: 'description'
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.clickedRowIndex = index;
          this.toggleEdit(data as MusicRecord);
        });
        return row;
      }
    };
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('splash');
    this.userEmail = localStorage.getItem('userEmail');
    this.loadRecords();
  }

  loadRecords(): void {
    this.musicRecordService.getAllRecords().subscribe(response => {
      this.dtOptions.data = response;
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
      this.musicRecord = response;
      jQuery('#addMusicRecord').modal('hide');
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.row.add(this.musicRecord).draw();
      });
    });
  }

  toggleEdit(musicRecord: MusicRecord): void {
    this.musicRecord = musicRecord;
    jQuery('#editMusicRecord').modal('show');
  }

  updateMusicRecord(): void {
    this.musicRecordService.updateMusicRecord(this.musicRecord).subscribe(response => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.row(this.clickedRowIndex).data(response).draw();
      });
      jQuery('#editMusicRecord').modal('hide');
    });
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
