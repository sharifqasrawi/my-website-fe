import { ThemePalette } from '@angular/material/core';
import { FilePickerComponent } from './../../../../../shared/file-picker/file-picker.component';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../../store/app.reducer';
import * as TrainingCoursesActions from '../../store/courses.actions';

interface DialogDate {
  editMode: boolean,
  courseId?: number,
  docId?: number,
}

@Component({
  selector: 'app-edit-courses-document',
  templateUrl: './edit-courses-document.component.html',
  styleUrls: ['./edit-courses-document.component.css']
})
export class EditCourseDocumentComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  colorAccent: ThemePalette = 'accent';

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  loading = false;
  loaded = false;
  errors: string[] = null;
  selectedFileId: number = null;

  checked = false;
  editMode = false;


  languages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<EditCourseDocumentComponent>,
    private dialog: MatDialog,
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
      description_EN: new FormControl(null, [Validators.required]),
      description_FR: new FormControl(null),
      path: new FormControl(null, [Validators.required]),
      isDisplayed: new FormControl(null),
      currentLang: new FormControl(null),
    });

    this.store.select('courses').subscribe(state => {
      this.creating = state.creatingDoc;
      this.created = state.createdDoc;
      this.updating = state.updatingDoc;
      this.updated = state.updatedDoc;

      if (this.data.docId && this.editMode) {
        const doc = state.courses.find(e => e.id === this.data.courseId).documents.find(d => d.id === this.data.docId);

        this.form.patchValue({
          name_EN: doc.name_EN,
          name_FR: doc.name_FR,
          description_EN: doc.description_EN,
          description_FR: doc.description_FR,
          path: doc.path,
          isDisplayed: doc.isDisplayed
        });
      }

      if (state.createdDoc || state.updatedDoc) {
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
      this.store.dispatch(new TrainingCoursesActions.CreateDocStart({
        courseId: this.data.courseId,
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        description_EN: this.form.value.description_EN,
        description_FR: this.form.value.description_FR,
        path: this.form.value.path,
        fileId: this.selectedFileId,
        isDisplayed: this.form.value.isDisplayed ? this.form.value.isDisplayed : false
      }));
    }
    else {
      this.store.dispatch(new TrainingCoursesActions.UpdateDocStart({
        id: this.data.docId,
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        description_EN: this.form.value.description_EN,
        description_FR: this.form.value.description_FR,
        path: this.form.value.path,
        fileId: this.selectedFileId,
        isDisplayed: this.form.value.isDisplayed ? this.form.value.isDisplayed : false
      }));
    }
  }

  selectFile() {
    var dialogRef = this.dialog.open(FilePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { filePath: string, fileId: number }) => {
      if (data) {
        this.form.patchValue({
          path: data.filePath
        });
        this.selectedFileId = data.fileId
      }
    });

  }

  onChangeLang() {
    this.currentLang = this.form.value.currentLang;
  }

  ngOnDestroy() {
    this.store.dispatch(new TrainingCoursesActions.ClearCreate());
    this.editMode = false;
  }
}
