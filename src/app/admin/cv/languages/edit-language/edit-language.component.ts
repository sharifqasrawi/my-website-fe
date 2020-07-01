import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import * as fromApp from '../../../../store/app.reducer';
import * as LanguagesActions from '../store/languages.actions'

interface DialogDate {
  editMode: boolean,
  name_EN?: string,
  name_FR?: string,
  levelRead?: number,
  levelSpeak?: number,
  levelWrite?: number,
  id?: number,
}

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.css']
})
export class EditLanguageComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;
  creating = false;
  created = false;
  errors: string[] = null;

  editMode = false;

  languages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<EditLanguageComponent>,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDate
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.editMode = this.data.editMode;

    this.form = new FormGroup({
      name_EN: new FormControl(null, [Validators.required]),
      name_FR: new FormControl(null),
      levelRead: new FormControl(null, [Validators.required]),
      levelSpeak: new FormControl(null, [Validators.required]),
      levelWrite: new FormControl(null, [Validators.required]),
      currentLang: new FormControl(this.currentLang)
    });

    this.store.select('languages').subscribe(state => {
      this.creating = state.creating;
      this.errors = state.errors;
      if (state.created || state.updated) {
        this.dialogRef.close();
      }
    });

    if (this.editMode) {
      this.form.patchValue({
        name_EN: this.data.name_EN,
        name_FR: this.data.name_FR,
        levelSpeak: this.data.levelSpeak,
        levelWrite: this.data.levelWrite,
        levelRead: this.data.levelRead,
      });
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new LanguagesActions.CreateStart({
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        levelRead: this.form.value.levelRead,
        levelSpeak: this.form.value.levelSpeak,
        levelWrite: this.form.value.levelWrite,
      }));
    } else {
      this.store.dispatch(new LanguagesActions.UpdateStart({
        id: this.data.id,
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        levelRead: this.form.value.levelRead,
        levelSpeak: this.form.value.levelSpeak,
        levelWrite: this.form.value.levelWrite,
      }));
    }
  }

  onChangeLang() {
    const lang = this.form.value.currentLang;

    this.currentLang = lang;
  }

  ngOnDestroy() {
    this.store.dispatch(new LanguagesActions.ClearErrors());
    this.store.dispatch(new LanguagesActions.ClearCreate());
    this.editMode = false;
  }
}
