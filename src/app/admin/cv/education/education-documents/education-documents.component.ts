import { PdfViewer2Component } from './../../../../shared/pdf-viewer2/pdf-viewer2.component';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EditEducationDocumentComponent } from './edit-education-document/edit-education-document.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { faFileAlt, faPlus, faTimes, faDownload, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

import { Document } from './../../../../models/document.model';
import * as fromApp from '../../../../store/app.reducer';
import * as EducationActions from '../store/education.actions';

interface DialogData {
  educationId?: number,
  // documents: Document[]
}

@Component({
  selector: 'app-education-documents',
  templateUrl: './education-documents.component.html',
  styleUrls: ['./education-documents.component.css']
})
export class EducationDocumentsComponent implements OnInit, OnDestroy {

  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTimes = faTimes;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;
  faEye = faEye;

  documents: Document[];

  currentLang: string = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EducationDocumentsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.store.select('education').subscribe(state => {
      this.documents = state.educations.find(e => e.id === this.data.educationId).documents;
    });
  }

  onClose() {
    this.bottomSheetRef.dismiss();
  }

  onAdd() {
    this.dialog.open(EditEducationDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: false, educationId: this.data.educationId }
    })
  }


  onEdit(id: number) {

    this.dialog.open(EditEducationDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: true, educationId: this.data.educationId, docId: id }
    })
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
        this.store.dispatch(new EducationActions.DeleteDocStart(id));
    });

  }

  onViewPdf(path: string) {
    const dialogRef = this.dialog.open(PdfViewer2Component, {
      width: '100%',
      panelClass: ['no-padding', 'no-scrolls', 'no-margin'],
      backdropClass: 'backdropBg',
      data: { filePath: path }
    });
  }


  ngOnDestroy() {
    this.store.dispatch(new EducationActions.ClearCreate());
  }
}
