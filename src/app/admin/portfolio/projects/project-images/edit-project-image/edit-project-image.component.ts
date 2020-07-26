import { ThemePalette } from '@angular/material/core';
import { ImagePickerComponent } from './../../../../../shared/image-picker/image-picker.component';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../../store/app.reducer';
import * as ProjectsActions from '../../store/projects.actions';

interface DialogDate {
  editMode: boolean,
  caption_EN?: string,
  caption_FR?: string,
  path?: string,
  isDisplayed?: boolean,
  id?: number,
  projectId?: number
}

@Component({
  selector: 'app-edit-project-image',
  templateUrl: './edit-project-image.component.html',
  styleUrls: ['./edit-project-image.component.css']
})
export class EditProjectImageComponent implements OnInit,OnDestroy {

  faPlusCircle = faPlusCircle;

  colorAccent: ThemePalette = 'accent';

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;
  creating = false;
  created = false;

  loading = false;
  loaded = false;

  errors: string[] = null;

  editMode = false;

  checked = false;

  languages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<EditProjectImageComponent>,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDate,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.editMode = this.data.editMode;

    this.form = new FormGroup({
      caption_EN: new FormControl(null, [Validators.required]),
      caption_FR: new FormControl(null),
      path: new FormControl(null, [Validators.required]),
      isDisplayed: new FormControl(null),
      currentLang: new FormControl(null),
    });

    if (this.editMode) {
      this.form.patchValue({
        caption_EN: this.data.caption_EN,
        caption_FR: this.data.caption_FR,
        path: this.data.path,
        isDisplayed: this.data.isDisplayed,
      });
    }

    this.store.select('projects').subscribe(state => {
      this.creating = state.creatingImage;
      this.created = state.createdImage;
      this.errors = state.errorsImages;

      if (state.createdImage || state.updatedImage) {
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
      this.store.dispatch(new ProjectsActions.CreateImageStart({
        projectId: this.data.projectId,
        caption_EN: this.form.value.caption_EN,
        caption_FR: this.form.value.caption_FR,
        path: this.form.value.path,
        isDisplayed: this.form.value.isDisplayed ? this.form.value.isDisplayed : false,
      }));
    }
    else {
      this.store.dispatch(new ProjectsActions.UpdateImageStart({
        id: this.data.id,
        caption_EN: this.form.value.caption_EN,
        caption_FR: this.form.value.caption_FR,
        path: this.form.value.path,
        isDisplayed: this.form.value.isDisplayed ? this.form.value.isDisplayed : false,
      }));
    }
  }

  onChangeLang() {
    const lang = this.form.value.currentLang;

    this.currentLang = lang;
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
          path: data.imagePath
        });
      }
    });

  }

  ngOnDestroy() {
    this.store.dispatch(new ProjectsActions.ClearErrors());
    this.store.dispatch(new ProjectsActions.ClearCreate());
    this.editMode = false;
  }
}
