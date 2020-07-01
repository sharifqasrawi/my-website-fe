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

import * as EducationActions from '../cv/education/store/education.actions';
import * as ExperiencesActions from '../cv/experiences/store/experiences.actions';
import * as LanguagesActions from '../cv/languages/store/languages.actions';
import * as TrainingCoursesActions from '../cv/training-courses/store/courses.actions';
import * as CVFilesActions from '../cv/cv-files/store/cvfiles.actions';


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
  educationsCount = 0;
  experiencesCount = 0;
  languagesCount = 0;
  coursesCount = 0;
  cvFileCount = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private titleService: Title,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.get(['ADMINISTRATION.DASHBOARD.DASHBOARD']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.DASHBOARD.DASHBOARD']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['ADMINISTRATION.DASHBOARD.DASHBOARD']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.DASHBOARD.DASHBOARD']}`);
      });
    });

    this.getData();

    this.store.select('users').pipe(map(state => state.users.length)).subscribe(count => this.usersCount = count);

    this.store.select('directories').pipe(map(state => state.directories.length)).subscribe(count => this.directoriesCount = count);

    this.store.select('files').pipe(map(state => state.files.length)).subscribe(count => this.filesCount = count);

    this.store.select('visits').pipe(map(state => state.visits.length)).subscribe(count => this.visitsCount = count);

    this.store.select('education').pipe(map(state => state.educations.length)).subscribe(count => this.educationsCount = count);

    this.store.select('experiences').pipe(map(state => state.experiences.length)).subscribe(count => this.experiencesCount = count);

    this.store.select('languages').pipe(map(state => state.languages.length)).subscribe(count => this.languagesCount = count);

    this.store.select('courses').pipe(map(state => state.courses.length)).subscribe(count => this.coursesCount = count);

    this.store.select('cvFiles').pipe(map(state => state.cvFiles.length)).subscribe(count => this.cvFileCount = count);


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

    this.store.dispatch(new EducationActions.FetchStart());
    this.store.dispatch(new ExperiencesActions.FetchStart());
    this.store.dispatch(new LanguagesActions.FetchStart());
    this.store.dispatch(new TrainingCoursesActions.FetchStart());
    this.store.dispatch(new CVFilesActions.FetchStart());


  }


}
