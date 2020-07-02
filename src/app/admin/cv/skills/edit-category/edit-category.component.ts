import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';


import * as fromApp from '../../../../store/app.reducer';
import * as SkillsActions from '../store/skills.actions';

interface DialogData {
  editMode: boolean,
  categoryId?: number,
  name_EN?: string,
  name_FR?: string,
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;

  editMode = false;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  errors: string[] = null;

  languages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.editMode = this.data.editMode;

    this.form = new FormGroup({
      name_EN: new FormControl(null, [Validators.required]),
      name_FR: new FormControl(null),
      currentLang: new FormControl(null)
    });

    if (this.editMode && this.data.categoryId) {
      this.form.patchValue({
        name_EN: this.data.name_EN,
        name_FR: this.data.name_FR,
        currentLang: this.translate.currentLang
      });
    }

    this.store.select('skills').subscribe(state => {
      this.creating = state.creatingCategory;
      this.created = state.createdCategory;
      this.updating = state.updatingCategory;
      this.updated = state.updatedCategory;
      this.errors = state.errors;

      if (state.createdCategory || state.updatedCategory) {
        this.dialogRef.close();
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new SkillsActions.CreateCategoryStart({
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
      }));
    }else {
      this.store.dispatch(new SkillsActions.UpdateCategoryStart({
        id: this.data.categoryId,
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
      }));
    }
  }

  onChangeLang() {
    this.currentLang = this.form.value.currentLang;
  }

  ngOnDestroy() {
    this.store.dispatch(new SkillsActions.ClearCreate());
    this.editMode = false;
  }
}
