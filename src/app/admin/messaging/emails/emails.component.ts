import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as MessagingActions from './../store/messaging.actions';
import { EmailMessage } from './../../../models/emailMessage.model';
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  faEnvelope = faEnvelope;
  faSearch = faSearch;

  messages: EmailMessage[] = null;

  errors: string[] = null;
  loading = false;
  loaded = false;

  displayedColumns: string[] = ['id', 'email', 'subject', 'dateTime', 'actions'];
  dataSource: MatTableDataSource<EmailMessage>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title
  ) {

  }

  ngOnInit(): void {

    this.translate.get(['ADMINISTRATION.MESSAGING.SENT_EMAILS']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.MESSAGING.SENT_EMAILS']}`);
    });
    this.translate.onLangChange.subscribe(() => {

      this.translate.get(['ADMINISTRATION.MESSAGING.SENT_EMAILS']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.MESSAGING.SENT_EMAILS']}`);
      });
    });

    this.store.dispatch(new MessagingActions.FetchEmailsStart());

    this.store.select('messaging').subscribe(messagesState => {
      this.messages = messagesState.emailMessages;
      this.loading = messagesState.loading;
      this.loaded = messagesState.loaded;
      this.errors = messagesState.errors;

      this.setTable();
    });

  }

  onRefresh() {
    this.store.dispatch(new MessagingActions.FetchEmailsStart());

    this.setTable();

  }

  private setTable() {
    this.dataSource = new MatTableDataSource(this.messages);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
