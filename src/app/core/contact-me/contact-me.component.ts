import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { faEnvelopeOpenText, faEdit } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as MessagingActions from '../../admin/messaging/store/messaging.actions';
@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit,OnDestroy {

 
  faEnvelopeOpenText = faEnvelopeOpenText;
  faEdit = faEdit;


  form: FormGroup;
  errors: string[] = null;
  sending = false;
  sent = false;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.form.get('formArray'); }

  constructor(
    private store: Store<fromApp.AppState>,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private titleService: Title
  ) { }


  ngOnInit(): void {
    this.translate.get(['CONTACT_ME.CONTACT_ME']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['CONTACT_ME.CONTACT_ME']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['CONTACT_ME.CONTACT_ME']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['CONTACT_ME.CONTACT_ME']}`);
      });
    });

    this.store.select('messaging').subscribe(state => {
      this.sending = state.sending;
      this.sent = state.sent;
      this.errors = state.errors
    });

    this.form = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: new FormControl(null, [Validators.required]),
        }),
        this._formBuilder.group({
          email: new FormControl(null, [Validators.required, Validators.email]),
        }),
        this._formBuilder.group({
          subject: new FormControl(null, [Validators.required]),
        }),
        this._formBuilder.group({
          text: new FormControl(null, [Validators.required]),
        }),
      ])
    });

    this.breadcrumbLinks = [
      { url: '/', label: 'Home', translate: true },
      { label: 'contact_me', translate: true },
    ];
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new MessagingActions.SendStart({
      name: this.form.value.formArray[0].name,
      email: this.form.value.formArray[1].email,
      subject: this.form.value.formArray[2].subject,
      text: this.form.value.formArray[3].text,
    }));

  }

  ngOnDestroy() {
    this.store.dispatch(new MessagingActions.ClearErrors());
    this.store.dispatch(new MessagingActions.ClearStatus());
  }

}
