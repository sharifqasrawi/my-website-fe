import { MatDialog } from '@angular/material/dialog';
import { ImgsViewerComponent } from './../../shared/imgs-viewer/imgs-viewer.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Language } from './../../models/language.model';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as fromApp from '../../store/app.reducer';
import * as PersonalInfoActions from '../../admin/cv/personal-info/store/personalInfo.actions';
import * as ContactInfoActions from '../../admin/cv/contact-info/store/contactInfo.actions';
import * as LanguagesActions from '../../admin/cv/languages/store/languages.actions';
import { ContactInfo } from './../../models/contactInfo.model';
import { PersonalInfo } from './../../models/personalInfo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faGlobe = faGlobe;

  pInfo: PersonalInfo = null;
  loadingPInfo = false;
  loadedPInfo = false;

  cInfo: ContactInfo = null;
  loadingCInfo = false;
  loadedCInfo = false;
  emails: string[];

  languages: Language[] = null;
  loadingLanguages = false;
  loadedLanguages = false;

  mobileQuery: MediaQueryList;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 993px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['COMMON.HOME']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['COMMON.HOME']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['COMMON.HOME']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['COMMON.HOME']}`);
      });
    });

    this.store.dispatch(new PersonalInfoActions.FetchStart());
    this.store.dispatch(new ContactInfoActions.FetchStart());
    this.store.dispatch(new LanguagesActions.FetchStart());

    this.store.select('personalInfo').subscribe(state => {
      this.pInfo = state.personalInfo;
      this.loadingPInfo = state.loading;
      this.loadedPInfo = state.loaded;
    });

    this.store.select('contactInfo').subscribe(state => {
      this.cInfo = state.contactInfo;
      this.loadingCInfo = state.loading;
      this.loadedCInfo = state.loaded;

      if (this.cInfo) {
        this.emails = this.cInfo.emails.split('|');
      }
    });

    this.store.select('languages').subscribe(state => {
      this.languages = state.languages;
      this.loadedLanguages = state.loaded;
      this.loadingLanguages = state.loading;
    });



  }

  onViewImage(imagePath: string) {
    const images = [imagePath];

    const dialogRef = this.dialog.open(ImgsViewerComponent, {
      data: { images: images, index: 0 },
      panelClass: ['no-padding', 'no-scrolls'],
      backdropClass: 'backdropBg',
    });
  }
}
