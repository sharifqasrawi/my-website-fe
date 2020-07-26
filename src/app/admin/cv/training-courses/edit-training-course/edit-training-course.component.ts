import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as TrainingCoursesActions from '../store/courses.actions';

interface DialogData {
  editMode: boolean,
  id: number,
  name?: string,
  type?: string,
  duration?: string,
  courseUrl?: string,
  dateTime?: string,
  establishment?: string,
  country_EN?: string,
  country_FR?: string,
  city_EN?: string,
  city_FR?: string,
}

@Component({
  selector: 'app-edit-training-course',
  templateUrl: './edit-training-course.component.html',
  styleUrls: ['./edit-training-course.component.css']
})
export class EditTrainingCourseComponent implements OnInit, OnDestroy {


  faPlusCircle = faPlusCircle;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;
  creating = false;
  created = false;
  errors: string[] = null;

  editMode = false;

  types = ['online', 'classic'];
  type: string;

  languages = ['en', 'fr'];
  currentLang: string = null;


  constructor(
    public dialogRef: MatDialogRef<EditTrainingCourseComponent>,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.editMode = this.data.editMode;

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      courseUrl: new FormControl(null),
      establishment: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      dateTime: new FormControl(null),
      country_EN: new FormControl(null),
      country_FR: new FormControl(null),
      city_EN: new FormControl(null),
      city_FR: new FormControl(null),
      currentLang: new FormControl(null)
    });

    if (this.editMode) {
      this.form.patchValue({
        name: this.data.name,
        type: this.data.type,
        duration: this.data.duration,
        establishment: this.data.establishment,
        courseUrl: this.data.courseUrl,
        dateTime: this.data.dateTime,
        country_EN: this.data.country_EN,
        country_FR: this.data.country_FR,
        city_EN: this.data.city_EN,
        city_FR: this.data.city_FR
      });
    }

    this.store.select('courses').subscribe(state => {
      this.creating = state.creating;
      this.created = state.created;
      this.errors = state.errors;

      if (state.created || state.updated) {
        this.dialogRef.close();
      }
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new TrainingCoursesActions.CreateStart({
        name: this.form.value.name,
        type: this.form.value.type,
        duration: this.form.value.duration,
        establishment: this.form.value.establishment,
        courseUrl: this.form.value.courseUrl,
        dateTime: this.form.value.dateTime,
        country_EN: this.form.value.country_EN,
        country_FR: this.form.value.country_FR,
        city_EN: this.form.value.city_EN,
        city_FR: this.form.value.city_FR,
      }));
    }
    else {
      this.store.dispatch(new TrainingCoursesActions.UpdateStart({
        id: this.data.id,
        name: this.form.value.name,
        type: this.form.value.type,
        duration: this.form.value.duration,
        establishment: this.form.value.establishment,
        courseUrl: this.form.value.courseUrl,
        dateTime: this.form.value.dateTime,
        country_EN: this.form.value.country_EN,
        country_FR: this.form.value.country_FR,
        city_EN: this.form.value.city_EN,
        city_FR: this.form.value.city_FR,
      }));
    }
  }

  onChangeLang() {
    this.currentLang = this.form.value.currentLang;
  }

  ngOnDestroy() {
    this.store.dispatch(new TrainingCoursesActions.ClearErrors());
    this.store.dispatch(new TrainingCoursesActions.ClearCreate());
  }
}
