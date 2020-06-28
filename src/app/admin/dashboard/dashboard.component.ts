import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as VisitsActions from './../visits/store/visits.actions';
import * as FilesActions from './../files/store/files.actions';
import * as DirectoriesActions from './../directories/store/directories.actions';
import * as MessagingActions from './../messaging/store/messaging.actions';
import * as UsersActions from './../users/store/users.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersCount = 0;
  messagesCount = 0;
  directoriesCount = 0;
  filesCount = 0;
  sentEmailsCount = 0;
  visitsCount = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private titleService: Title,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.get(['DASHBOARD.DASHBOARD']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['DASHBOARD.DASHBOARD']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['DASHBOARD.DASHBOARD']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['DASHBOARD.DASHBOARD']}`);
      });
    });

    this.getData();

    this.store.select('users').pipe(map(state => state.users.length)).subscribe(count => this.usersCount = count);

    this.store.select('directories').pipe(map(state => state.directories.length)).subscribe(count => this.directoriesCount = count);

    this.store.select('files').pipe(map(state => state.files.length)).subscribe(count => this.filesCount = count);

    this.store.select('visits').pipe(map(state => state.visits.length)).subscribe(count => this.visitsCount = count);

    this.store.select('messaging').subscribe(state => {
      this.messagesCount = state.messages.length; this.sentEmailsCount = state.emailMessages.length;
    });


  }



  onRefresh() {
    this.getData();
  }

  getData() {
    this.store.dispatch(new UsersActions.FetchStart());
    this.store.dispatch(new MessagingActions.FetchStart());
    this.store.dispatch(new MessagingActions.FetchEmailsStart());
    this.store.dispatch(new DirectoriesActions.FetchStart());
    this.store.dispatch(new FilesActions.FetchStart());
    this.store.dispatch(new VisitsActions.FetchVisitsClientStart());


  }


}
