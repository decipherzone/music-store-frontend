import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {LoginFormComponent} from './login-registration/login-form.component';
import {MusicRecordComponent} from './music-record/music-record.component';
import {CommonhttpServices} from './lib/commonhttp.services';
import {LoginRegistrationService} from './login-registration/login-registration.service';
import {DataTablesModule} from 'angular-datatables';
import {MusicRecordsService} from './music-record/music-record.service';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule, HttpModule],
  declarations: [AppComponent, LoginFormComponent, MusicRecordComponent],
  providers: [CommonhttpServices, LoginRegistrationService, MusicRecordsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
