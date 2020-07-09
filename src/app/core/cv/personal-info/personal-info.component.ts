import { Component, OnInit } from '@angular/core';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { faPhoneAlt, faAt, faMapMarked, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as PersonalInfoActions from '../../../admin/cv/personal-info/store/personalInfo.actions';
import * as ContactInfoActions from '../../../admin/cv/contact-info/store/contactInfo.actions';
import { PersonalInfo } from './../../../models/personalInfo.model';
import { ContactInfo } from './../../../models/contactInfo.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  faPhoneAlt = faPhoneAlt;
  faAt = faAt;
  faMapMarked = faMapMarked;
  faInfo = faInfoCircle;

  pInfo: PersonalInfo = null;
  loadingPInfo = false;
  loadedPInfo = false;
  errors: string[] = null;


  cInfo: ContactInfo = null;
  loadingCInfo = false;
  loadedCInfo = false;

  emails: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.CV']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.CV']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.CV']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.CV']}`);
      });
    });

    this.store.dispatch(new PersonalInfoActions.FetchStart());
    this.store.dispatch(new ContactInfoActions.FetchStart());

    this.store.select('personalInfo').subscribe(state => {
      this.pInfo = state.personalInfo;
      this.loadingPInfo = state.loading;
      this.loadedPInfo = state.loaded;

      if (state.errors) {
        if (this.errors) {
          this.errors = [...this.errors, ...state.errors];
        } else {
          this.errors = [...state.errors]
        }
      }
    });

    this.store.select('contactInfo').subscribe(state => {
      this.cInfo = state.contactInfo;
      this.loadingCInfo = state.loading;
      this.loadedCInfo = state.loaded;

      if (state.errors) {
        if (this.errors) {
          this.errors = [...this.errors, ...state.errors];
        } else {
          this.errors = [...state.errors]
        }
      }

      if (state.contactInfo)
        this.emails = state.contactInfo.emails.split('|');
    });
  }

  getSanitizedImage = (path: string) => this.sanitizer.bypassSecurityTrustResourceUrl(path);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}
