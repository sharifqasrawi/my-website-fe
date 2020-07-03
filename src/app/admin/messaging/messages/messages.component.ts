import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faEnvelope, faEye, faEyeSlash, faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as MessagingActions from './../store/messaging.actions';
import { Message } from './../../../models/message.model';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;


  messages: Message[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;

  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'dateTime', 'isSeen', 'actions'];
  dataSource: MatTableDataSource<Message>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.translate.get(['ADMINISTRATION.MESSAGING.INBOX']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.MESSAGING.INBOX']}`);
    });
    this.translate.onLangChange.subscribe(() => {

      this.translate.get(['ADMINISTRATION.MESSAGING.INBOX']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.MESSAGING.INBOX']}`);
      });
    });

    if (!this.messages)
      this.store.dispatch(new MessagingActions.FetchStart());

    this.store.select('messaging').subscribe(messagesState => {
      this.messages = messagesState.messages;
      this.loading = messagesState.loading;
      this.loaded = messagesState.loaded;
      this.errors = messagesState.errors;

      this.setTable();
    });

  }

  onRefresh() {
    this.store.dispatch(new MessagingActions.FetchStart());

    this.setTable();

  }

  onSelect(id: number) {
    this.router.navigate(['admin', 'messages', id]);
  }

  onDelete(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.DELETE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.DELETE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new MessagingActions.DeleteStart(id));
    });
  }

  onChangeSeen(id: number) {
    this.store.dispatch(new MessagingActions.ChangeSeenStart(id));
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
