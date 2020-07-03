import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as fromApp from '../../../../store/app.reducer';
import * as ExperienceActions from './../store/experiences.actions';

import { Experience } from './../../../../models/experience.model';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  editMode = false;

  public Editor = ClassicEditor;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  experiences: Experience[] = null;
  editedExperienceId: number = null;
  loading = false;
  loaded = false;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  errors: string[] = null;

  checked = false;
  isCurrentlyWorking = false;
  colorPrimary: ThemePalette = 'primary';

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
    this.translate.get(['CV.EXPERIENCES.EXPERIENCES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.EXPERIENCES.EXPERIENCES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.EXPERIENCES.EXPERIENCES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.EXPERIENCES.EXPERIENCES']}`);
      });
    });


    this.form = new FormGroup({
      title_EN: new FormControl(null, [Validators.required]),
      title_FR: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      accomplishments_EN: new FormControl(null),
      accomplishments_FR: new FormControl(null),
      responisbilites_EN: new FormControl(null),
      responisbilites_FR: new FormControl(null),
      country_EN: new FormControl(null, [Validators.required]),
      country_FR: new FormControl(null),
      city_EN: new FormControl(null, [Validators.required]),
      city_FR: new FormControl(null),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null),
      isCurrentlyWorking: new FormControl(null),
    });

    if (!this.experiences || this.experiences.length === 0) {
      this.store.dispatch(new ExperienceActions.FetchStart());
    }


    this.store.select('experiences').subscribe(state => {
      this.experiences = state.experiences;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.creating = state.creating;
      this.created = state.created;
      this.updating = state.updating;
      this.updated = state.updated;
      this.errors = state.errors;

      if (this.created || this.updated) {
        this.router.navigate(['/admin', 'cv', 'experiences']);
      }


      this.route.params.subscribe((params: Params) => {
        if (params.id) {
          this.editMode = true;
          this.editedExperienceId = +params.id;

          if (this.experiences && this.experiences.length > 0) {
            const exp = this.experiences.find(e => e.id === +params.id);

            this.form.patchValue({
              title_EN: exp.title_EN,
              title_FR: exp.title_FR,
              accomplishments_EN: exp.accomplishments_EN,
              accomplishments_FR: exp.accomplishments_FR,
              responisbilites_EN: exp.responisbilites_EN,
              responisbilites_FR: exp.responisbilites_FR,
              country_EN: exp.country_EN,
              country_FR: exp.country_FR,
              city_EN: exp.city_EN,
              city_FR: exp.city_FR,
              company: exp.company,
              startDate: new Date(exp.startDate).toISOString().substr(0, 10),
              endDate: !exp.isCurrentlyWorking ? new Date(exp.endDate).toISOString().substr(0, 10) : null,
              isCurrentlyWorking: exp.isCurrentlyWorking
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
      this.store.dispatch(new ExperienceActions.CreateStart({
        title_EN: this.form.value.title_EN,
        title_FR: this.form.value.title_FR,
        accomplishments_EN: this.form.value.accomplishments_EN,
        accomplishments_FR: this.form.value.accomplishments_FR,
        responisbilites_EN: this.form.value.responisbilites_EN,
        responisbilites_FR: this.form.value.responisbilites_FR,
        country_EN: this.form.value.country_EN,
        country_FR: this.form.value.country_FR,
        city_EN: this.form.value.city_EN,
        city_FR: this.form.value.city_FR,
        company: this.form.value.company,
        startDate: this.form.value.startDate,
        endDate: !this.isCurrentlyWorking ? this.form.value.endDate : null,
        isCurrentlyWorking: this.form.value.isCurrentlyWorking
      }));
    }
    else {
      this.store.dispatch(new ExperienceActions.UpdateStart({
        id: this.editedExperienceId,
        title_EN: this.form.value.title_EN,
        title_FR: this.form.value.title_FR,
        accomplishments_EN: this.form.value.accomplishments_EN,
        accomplishments_FR: this.form.value.accomplishments_FR,
        responisbilites_EN: this.form.value.responisbilites_EN,
        responisbilites_FR: this.form.value.responisbilites_FR,
        country_EN: this.form.value.country_EN,
        country_FR: this.form.value.country_FR,
        city_EN: this.form.value.city_EN,
        city_FR: this.form.value.city_FR,
        company: this.form.value.company,
        startDate: this.form.value.startDate,
        endDate: !this.isCurrentlyWorking ? this.form.value.endDate : null,
        isCurrentlyWorking: this.form.value.isCurrentlyWorking
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
        this.router.navigate(['/admin', 'cv', 'experiences']);
    });
  }

  onSelectCurrentlyWorking() {
    this.isCurrentlyWorking = this.form.value.isCurrentlyWorking;
  }

  ngOnDestroy() {
    this.store.dispatch(new ExperienceActions.ClearErrors());
    this.store.dispatch(new ExperienceActions.ClearStatus());
    this.editMode = false;
    this.editedExperienceId = null;
  }
}
