import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {LoginFormComponent} from './login-registration/login-form.component';
import {MusicRecordComponent} from './music-record/music-record.component';

const appRoutes: Routes = [
  {path: '', component: LoginFormComponent, pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent, pathMatch: 'full'},
  {path: 'music-record', component: MusicRecordComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: true}  // debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
}
