import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Education } from './../../../models/education.model';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faGraduationCap, faEdit, faTrash, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { EducationDocumentsComponent } from './../education/education-documents/education-documents.component';
import * as fromApp from '../../../store/app.reducer';
import * as EducationActions from './store/education.actions';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  faGraduationCap = faGraduationCap;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileAlt = faFileAlt;

  educations: Education[] = null;
  loading = false;
  loaded = false;
  deleting = false;
  deleted = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.EDUCATION.EDUCATION']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.EDUCATION.EDUCATION']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.EDUCATION.EDUCATION']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.EDUCATION.EDUCATION']}`);
      });
    });

    if (!this.educations)
      this.store.dispatch(new EducationActions.FetchStart('admin'));

    this.store.select('education').subscribe(state => {
      this.educations = state.educations;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.deleting = state.deleting;
      this.deleted = state.deleted;
      this.errors = state.errors;

    });
  }


  onRefresh() {
    this.store.dispatch(new EducationActions.FetchStart('admin'));
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
        this.store.dispatch(new EducationActions.DeleteStart(id));
    });

  }

  onOpenDocuments(educationId: number) {
    this.bottomSheet.open(EducationDocumentsComponent, {
      disableClose: true,
      data: { educationId: educationId }
    });
  }
}
