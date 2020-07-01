import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ContactInfo } from './../../../models/contactInfo.model';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import * as fromApp from '../../../store/app.reducer';
import * as ContactInfoActions from './store/contactInfo.actions';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnDestroy {

  faPhoneAlt = faPhoneAlt;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  contactInfo: ContactInfo = null;
  loading = false;
  loaded = false;
  saving = false;
  saved = false;
  errors: string[] = null;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: string[] = [];

  languages = ['en', 'fr'];
  currentLang: string = null;
  editLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.editLang = this.translate.currentLang;
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.PERSONAL_INFO.PERSONAL_INFO']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.PERSONAL_INFO.PERSONAL_INFO']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.PERSONAL_INFO.PERSONAL_INFO']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.PERSONAL_INFO.PERSONAL_INFO']}`);
      });
    });

    this.form = new FormGroup({
      emails: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      country_EN: new FormControl(null, [Validators.required]),
      country_FR: new FormControl(null),
      city_EN: new FormControl(null, [Validators.required]),
      city_FR: new FormControl(null),
      zipCode: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      streetNumber: new FormControl(null, [Validators.required]),
      linkedInUrl: new FormControl(null, [Validators.required]),
      gitHubUrl: new FormControl(null, [Validators.required]),
      facebookUrl: new FormControl(null, [Validators.required]),
    });

    this.store.dispatch(new ContactInfoActions.FetchStart());

    this.store.select('contactInfo').subscribe(state => {
      this.contactInfo = state.contactInfo;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.saving = state.saving;
      this.saved = state.saved;
      this.errors = state.errors;

      if (this.contactInfo) {
        this.emails = this.contactInfo.emails.split('|');
        this.form.patchValue({
          emails: this.emails.join('|'),
          phone: this.contactInfo.phone,
          country_EN: this.contactInfo.country_EN,
          country_FR: this.contactInfo.country_FR,
          city_EN: this.contactInfo.city_EN,
          city_FR: this.contactInfo.city_FR,
          zipCode: this.contactInfo.zipCode,
          street: this.contactInfo.street,
          streetNumber: this.contactInfo.streetNumber,
          linkedInUrl: this.contactInfo.linkedInUrl,
          gitHubUrl: this.contactInfo.gitHubUrl,
          facebookUrl: this.contactInfo.facebookUrl,
        });
      }

    });

  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new ContactInfoActions.UpdateStart({
      emails: this.emails.join('|'),
      phone: this.form.value.phone,
      country_EN: this.form.value.country_EN,
      country_FR: this.form.value.country_FR,
      city_EN: this.form.value.city_EN,
      city_FR: this.form.value.city_FR,
      zipCode: this.form.value.zipCode,
      streetNumber: this.form.value.streetNumber,
      street: this.form.value.street,
      linkedInUrl: this.form.value.linkedInUrl,
      gitHubUrl: this.form.value.gitHubUrl,
      facebookUrl: this.form.value.facebookUrl
    }));

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ContactInfoActions.ClearErrors());
    this.store.dispatch(new ContactInfoActions.ClearStatus());
  }
}
