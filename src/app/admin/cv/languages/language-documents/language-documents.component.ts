import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EditLanguageDocumentComponent } from './edit-language-document/edit-language-document.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { faFileAlt, faPlus, faTimes, faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Document } from './../../../../models/document.model';
import * as fromApp from '../../../../store/app.reducer';
import * as LanguagesActions from '../store/languages.actions';

interface DialogData {
  languageId?: number,
  // documents: Document[]
}

@Component({
  selector: 'app-language-documents',
  templateUrl: './language-documents.component.html',
  styleUrls: ['./language-documents.component.css']
})
export class LanguageDocumentsComponent implements OnInit, OnDestroy {

  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTimes = faTimes;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  documents: Document[];

  currentLang: string = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<LanguageDocumentsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.store.select('languages').subscribe(state => {
      this.documents = state.languages.find(e => e.id === this.data.languageId).documents;
    });
  }

  onClose() {
    this.bottomSheetRef.dismiss();
  }

  onAdd() {
    this.dialog.open(EditLanguageDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: false, languageId: this.data.languageId }
    })
  }


  onEdit(id: number) {

    this.dialog.open(EditLanguageDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: true, languageId: this.data.languageId, docId: id }
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
        this.store.dispatch(new LanguagesActions.DeleteDocStart(id));
    });

  }

  ngOnDestroy() {
    this.store.dispatch(new LanguagesActions.ClearCreate());
  }
}
