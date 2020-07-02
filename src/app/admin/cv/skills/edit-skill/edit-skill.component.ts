import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import * as SkillsActions from '../store/skills.actions';
import * as fromApp from '../../../../store/app.reducer';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


interface DialogData {
  editMode: boolean,
  categoryId?: number,
  skillId?: number,
  name_EN?: string,
  name_FR?: string,
  level?: number,
}

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
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
    public dialogRef: MatDialogRef<EditSkillComponent>,
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
      level: new FormControl(null, [Validators.required]),
      currentLang: new FormControl(null)
    });

    if (this.editMode && this.data.skillId) {
      this.form.patchValue({
        name_EN: this.data.name_EN,
        name_FR: this.data.name_FR,
        level: this.data.level,
        currentLang: this.translate.currentLang
      });
    }

    this.store.select('skills').subscribe(state => {
      this.creating = state.creatingSkill;
      this.created = state.createdSkill;
      this.updating = state.updatingSkill;
      this.updated = state.updatedSkill;
      this.errors = state.errors;

      if (state.createdSkill || state.updatedSkill) {
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
      this.store.dispatch(new SkillsActions.CreateSkillStart({
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        level: this.form.value.level,
        categoryId: this.data.categoryId
      }));
    } else {
      this.store.dispatch(new SkillsActions.UpdateSkillStart({
        id: this.data.skillId,
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        level: this.form.value.level,
        categoryId: this.data.categoryId
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
