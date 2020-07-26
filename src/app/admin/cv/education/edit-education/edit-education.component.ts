import { Education } from './../../../../models/education.model';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as EducationActions from '../store/education.actions';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  editMode = false;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  educations: Education[] = null;
  editedEducationId: number = null;
  loading = false;
  loaded = false;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  errors: string[] = null;

  languages = ['en', 'fr'];
  currentLang: string = null;
  editLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.editLang = this.translate.currentLang;
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.EDUCATION.EDUCATION']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.EDUCATION.EDUCATION']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.EDUCATION.EDUCATION']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.EDUCATION.EDUCATION']}`);
      });
    });

    this.form = new FormGroup({
      title_EN: new FormControl(null, [Validators.required]),
      title_FR: new FormControl(null),
      establishment_EN: new FormControl(null, [Validators.required]),
      establishment_FR: new FormControl(null),
      mention_EN: new FormControl(null, [Validators.required]),
      mention_FR: new FormControl(null),
      country_EN: new FormControl(null, [Validators.required]),
      country_FR: new FormControl(null),
      city_EN: new FormControl(null, [Validators.required]),
      city_FR: new FormControl(null),
      specialization_EN: new FormControl(null, [Validators.required]),
      specialization_FR: new FormControl(null),
      yearsCount: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      graduateDate: new FormControl(null, [Validators.required]),
    });

    if (!this.educations || this.educations.length === 0) {
      this.store.dispatch(new EducationActions.FetchStart());
    }

    this.store.select('education').subscribe(state => {
      this.educations = state.educations;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.creating = state.creating;
      this.created = state.created;
      this.updating = state.updating;
      this.updated = state.updated;
      this.errors = state.errors;

      if (this.created || this.updated) {
        this.router.navigate(['/admin', 'cv', 'education']);
      }


      // if (!this.educations || this.educations.length === 0) {
      //   this.store.dispatch(new EducationActions.FetchStart());
      // }

      this.route.params.subscribe((params: Params) => {
        if (params.id) {
          this.editMode = true;
          this.editedEducationId = +params.id;


          if (this.educations && this.educations.length > 0) {
            const education = this.educations.find(e => e.id === +params.id);

            this.form.patchValue({
              title_EN: education.title_EN,
              title_FR: education.title_FR,
              establishment_EN: education.establishment_EN,
              establishment_FR: education.establishment_FR,
              mention_EN: education.mention_EN,
              mention_FR: education.mention_FR,
              country_EN: education.country_EN,
              country_FR: education.country_FR,
              city_EN: education.city_EN,
              city_FR: education.city_FR,
              specialization_EN: education.specialization_EN,
              specialization_FR: education.specialization_FR,
              yearsCount: education.yearsCount,
              note: education.note,
              startDate: new Date(new Date(education.startDate).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              graduateDate: new Date(new Date(education.graduateDate).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            });
          }
        }
      });
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new EducationActions.CreateStart({
        title_EN: this.form.value.title_EN,
        title_FR: this.form.value.title_FR,
        establishment_EN: this.form.value.establishment_EN,
        establishment_FR: this.form.value.establishment_FR,
        mention_EN: this.form.value.mention_EN,
        mention_FR: this.form.value.mention_FR,
        country_EN: this.form.value.country_EN,
        country_FR: this.form.value.country_FR,
        city_EN: this.form.value.city_EN,
        city_FR: this.form.value.city_FR,
        specialization_EN: this.form.value.specialization_EN,
        specialization_FR: this.form.value.specialization_FR,
        yearsCount: this.form.value.yearsCount,
        note: this.form.value.note,
        startDate: this.form.value.startDate,
        graduateDate: this.form.value.graduateDate,
      }));
    } else {
      this.store.dispatch(new EducationActions.UpdateStart({
        id: this.editedEducationId,
        title_EN: this.form.value.title_EN,
        title_FR: this.form.value.title_FR,
        establishment_EN: this.form.value.establishment_EN,
        establishment_FR: this.form.value.establishment_FR,
        mention_EN: this.form.value.mention_EN,
        mention_FR: this.form.value.mention_FR,
        country_EN: this.form.value.country_EN,
        country_FR: this.form.value.country_FR,
        city_EN: this.form.value.city_EN,
        city_FR: this.form.value.city_FR,
        specialization_EN: this.form.value.specialization_EN,
        specialization_FR: this.form.value.specialization_FR,
        yearsCount: this.form.value.yearsCount,
        note: this.form.value.note,
        startDate: this.form.value.startDate,
        graduateDate: this.form.value.graduateDate,
      }));
    }
  }


  onCancel() {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.CANCEL_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.CANCEL_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/admin', 'cv', 'education']);
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new EducationActions.ClearErrors());
    this.store.dispatch(new EducationActions.ClearStatus());
    this.editMode = false;
    this.editedEducationId = null;
  }
}
