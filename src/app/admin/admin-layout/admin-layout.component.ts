import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './../../security/store/auth.actions';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  mobileQuery: MediaQueryList;


  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  showSubmenuCV = false;
  showSubmenuPortfolio = false;
  showSubmenuDirs = false;
  showSubmenuMessages = false;
  showSubmenuLanguages = false;

  navOpened = true;

  userSub: Subscription;
  firstName: string = null;
  lastName: string = null;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    private titleService: Title,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public translate: TranslateService
  ) {
    this.titleService.setTitle('Admin');

    this.mobileQuery = media.matchMedia('(max-width: 993px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    if (!localStorage.getItem('lang')) {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      translate.use(localStorage.getItem('lang'));
    }
  }

  private _mobileQueryListener: () => void;

  ngOnInit(): void {

    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user ?? null))
      .subscribe(user => {
        this.isAuthenticated = !!user;

        // Needs work !!!!
        if (user && this.isAuthenticated) {
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.isAdmin = user.isAdmin;
        }
        else {
          this.isAdmin = false;
          this.firstName = null;
          this.lastName = null;
        }
      });
  }


  onLogout() {
    this.store.dispatch(new AuthActions.Logout());

    this.snackBar.open('Good Bye !! ', 'Thanks!',
      {
        duration: 2000
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  onChangeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}
