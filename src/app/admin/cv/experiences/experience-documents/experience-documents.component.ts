import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EditExperienceDocumentComponent } from './edit-experience-document/edit-experience-document.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { faFileAlt, faPlus, faTimes, faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Document } from './../../../../models/document.model';
import * as fromApp from '../../../../store/app.reducer';
import * as ExperiencesActions from '../store/experiences.actions';

interface DialogData {
  experienceId?: number,
  // documents: Document[]
}

@Component({
  selector: 'app-experience-documents',
  templateUrl: './experience-documents.component.html',
  styleUrls: ['./experience-documents.component.css']
})
export class ExperienceDocumentsComponent implements OnInit, OnDestroy {

  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTimes = faTimes;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  documents: Document[];

  currentLang: string = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ExperienceDocumentsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.store.select('experiences').subscribe(state => {
      this.documents = state.experiences.find(e => e.id === this.data.experienceId).documents;
    });
  }

  onClose() {
    this.bottomSheetRef.dismiss();
  }

  onAdd() {
    this.dialog.open(EditExperienceDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: false, experienceId: this.data.experienceId }
    })
  }


  onEdit(id: number) {

    this.dialog.open(EditExperienceDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: true, experienceId: this.data.experienceId, docId: id }
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
        this.store.dispatch(new ExperiencesActions.DeleteDocStart(id));
    });

  }

  ngOnDestroy() {
    this.store.dispatch(new ExperiencesActions.ClearCreate());
  }
}
