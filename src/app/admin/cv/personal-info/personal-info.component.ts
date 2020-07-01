import { Title } from '@angular/platform-browser';
import { ImagePickerComponent } from './../../../shared/image-picker/image-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as fromApp from '../../../store/app.reducer';
import * as PersonalInfoActions from './store/personalInfo.actions';

import { PersonalInfo } from './../../../models/personalInfo.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  faInfoCircle = faInfoCircle;

  public Editor = ClassicEditor;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  maritalStatus = ['single', 'in_a_relationship', 'engaged', 'married'];

  personalInfo: PersonalInfo = null;
  loading = false;
  loaded = false;
  saving = false;
  saved = false;
  errors: string[] = null;

  languages = ['en', 'fr'];
  currentLang: string = null;
  editLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private titleService: Title,
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
      name: new FormControl(null, [Validators.required]),
      title_EN: new FormControl(null, [Validators.required]),
      title_FR: new FormControl(null, [Validators.required]),
      about_EN: new FormControl(null, [Validators.required]),
      about_FR: new FormControl(null, [Validators.required]),
      maritalStatus: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      driversLicense: new FormControl(null),
    });

    this.store.dispatch(new PersonalInfoActions.FetchStart());

    this.store.select('personalInfo').subscribe(state => {
      this.personalInfo = state.personalInfo;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.saving = state.saving;
      this.saved = state.saved;
      this.errors = state.errors;

      if (this.personalInfo) {
        this.form.patchValue({
          name: this.personalInfo.name,
          title_EN: this.personalInfo.title_EN,
          title_FR: this.personalInfo.title_FR,
          about_EN: this.personalInfo.about_EN,
          about_FR: this.personalInfo.about_FR,
          maritalStatus: this.personalInfo.maritalStatus,
          imagePath: this.personalInfo.imagePath,
          driversLicense: this.personalInfo.driversLicense,
          dateOfBirth: new Date(this.personalInfo.dateOfBirth).toISOString().substr(0, 10),
        });
      }
    });


  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new PersonalInfoActions.UpdateStart({
      name: this.form.value.name,
      title_EN: this.form.value.title_EN,
      title_FR: this.form.value.title_FR,
      about_EN: this.form.value.about_EN,
      about_FR: this.form.value.about_FR,
      imagePath: this.form.value.imagePath,
      maritalStatus: this.form.value.maritalStatus,
      dateOfBirth: this.form.value.dateOfBirth,
      driversLicense: this.form.value.driversLicense
    }));
  }


  selectImage() {
    var dialogRef = this.dialog.open(ImagePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { imagePath: string }) => {
      if (data) {
        this.form.patchValue({
          imagePath: data.imagePath
        });
      }
    });

  }


  ngOnDestroy() {
    this.store.dispatch(new PersonalInfoActions.ClearErrors());
    this.store.dispatch(new PersonalInfoActions.ClearStatus());
  }
}
