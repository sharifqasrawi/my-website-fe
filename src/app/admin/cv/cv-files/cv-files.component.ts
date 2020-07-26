import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FilePickerComponent } from './../../../shared/file-picker/file-picker.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { faFileArchive, faPlusCircle, faFileDownload, faGlobe, faFile, faEdit, faTrash, faDownload, faClock } from '@fortawesome/free-solid-svg-icons';

import { CVFile } from './../../../models/cvFile.model';
import * as fromApp from '../../../store/app.reducer';
import * as CVFilesActions from './store/cvfiles.actions';

@Component({
  selector: 'app-cv-files',
  templateUrl: './cv-files.component.html',
  styleUrls: ['./cv-files.component.css']
})
export class CvFilesComponent implements OnInit {

  faFileArchive = faFileArchive;
  faPlusCircle = faPlusCircle;
  faFileDownload = faFileDownload;
  faFile = faFile;
  faGlobe = faGlobe;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;
  faClock = faClock;

  editMode = false;
  editedFileId: number = null;

  cvFiles: CVFile[] = null;
  loading = false;
  loaded = false;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  deleting = false;
  deleted = false;
  errors: string[] = null;

  form: FormGroup;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.CV_FILES.CV_FILES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.CV_FILES.CV_FILES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.CV_FILES.CV_FILES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.CV_FILES.CV_FILES']}`);
      });
    });

    this.form = new FormGroup({
      fileName: new FormControl(null, [Validators.required]),
      language: new FormControl(null, [Validators.required]),
      filePath: new FormControl(null, [Validators.required]),
    });

    if (!this.cvFiles)
      this.store.dispatch(new CVFilesActions.FetchStart());

    this.store.select('cvFiles').subscribe(state => {
      this.cvFiles = state.cvFiles;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.creating = state.creating;
      this.created = state.created;
      this.updating = state.updating;
      this.updated = state.updated;
      this.deleting = state.deleting;
      this.deleted = state.deleted;
      this.errors = state.errors;

      if (this.created || this.updated) {
        this.form.reset();
        if (this.editMode) {
          this.editMode = false;
          this.editedFileId = null;
        }
      }

    });
  }

  onRefresh() {
    this.store.dispatch(new CVFilesActions.FetchStart());
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new CVFilesActions.CreateStart({
        fileName: this.form.value.fileName,
        language: this.form.value.language,
        filePath: this.form.value.filePath,
      }));
    } else {
      this.store.dispatch(new CVFilesActions.UpdateStart({
        id: this.editedFileId,
        fileName: this.form.value.fileName,
        language: this.form.value.language,
        filePath: this.form.value.filePath,
      }));
    }
  }

  onEdit(id: number) {
    this.editMode = true;
    this.editedFileId = id;
    if (this.editMode) {
      const cv = this.cvFiles.find(c => c.id === id);
      this.form.patchValue({
        fileName: cv.fileName,
        language: cv.language,
        filePath: cv.filePath,
      });
    }

  }

  onCancelEdit() {
    this.editMode = false;
    this.editedFileId = null;
    this.form.reset();
  }

  onDelete(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.DELETE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.DELETE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new CVFilesActions.DeleteStart(id));
    });

  }

  selectFile() {
    var dialogRef = this.dialog.open(FilePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { filePath: string }) => {
      if (data) {
        this.form.patchValue({
          filePath: data.filePath
        });
      }
    });

  }


}
