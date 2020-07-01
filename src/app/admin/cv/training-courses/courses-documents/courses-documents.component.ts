import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EditCourseDocumentComponent } from './edit-courses-document/edit-courses-document.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { faFileAlt, faPlus, faTimes, faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Document } from './../../../../models/document.model';
import * as fromApp from '../../../../store/app.reducer';
import * as coursesActions from '../store/courses.actions';

interface DialogData {
  courseId?: number,
  // documents: Document[]
}

@Component({
  selector: 'app-courses-documents',
  templateUrl: './courses-documents.component.html',
  styleUrls: ['./courses-documents.component.css']
})
export class CourseDocumentsComponent implements OnInit, OnDestroy {

  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTimes = faTimes;
  faEdit = faEdit;
  faTrash = faTrash;
  faDownload = faDownload;

  documents: Document[];

  currentLang: string = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CourseDocumentsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.store.select('courses').subscribe(state => {
      this.documents = state.courses.find(e => e.id === this.data.courseId).documents;
    });
  }

  onClose() {
    this.bottomSheetRef.dismiss();
  }

  onAdd() {
    this.dialog.open(EditCourseDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: false, courseId: this.data.courseId }
    })
  }


  onEdit(id: number) {

    this.dialog.open(EditCourseDocumentComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: true, courseId: this.data.courseId, docId: id }
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
        this.store.dispatch(new coursesActions.DeleteDocStart(id));
    });

  }

  ngOnDestroy() {
    this.store.dispatch(new coursesActions.ClearCreate());
  }
}
