import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as MessagingActions from '../store/messaging.actions';
import { Message } from './../../../models/message.model';
import { faUser, faReply, faBackward } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {


  faUser = faUser;
  faReply = faReply;
  faBackward = faBackward;

  msgId: number = null;
  message: Message = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new MessagingActions.FetchStart());

    this.route.params.subscribe((params: Params) => {
      this.msgId = +params.id;
    });

    this.store.select('messaging')
      .pipe(
        map(messagesState => messagesState.messages.find(m => m.id === this.msgId))
      )
      .subscribe(message => {
        this.message = message;
      });

    if (!this.message.isSeen) {
      this.store.dispatch(new MessagingActions.ChangeSeenStart(this.message.id));
    }
  }

  onGoBack() {
    this.router.navigate(['admin', 'messages']);
  }

}
