import { Store } from '@ngrx/store';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './security/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';
import *  as VisitsActions from './admin/visits/store/visits.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My-Website-FE';

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    //this.store.dispatch(new VisitsActions.VisitStart());
  }
}
