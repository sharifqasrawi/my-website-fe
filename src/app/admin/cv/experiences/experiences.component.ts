import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faBriefcase, faEdit, faTrash, faAt, faMapMarked, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { ExperienceDocumentsComponent } from './experience-documents/experience-documents.component';
import * as fromApp from '../../../store/app.reducer';
import * as ExperienceActions from './store/experiences.actions';

import { Experience } from './../../../models/experience.model';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faBriefcase = faBriefcase;
  faAt = faAt;
  faMapMarked = faMapMarked;
  faFileAlt = faFileAlt;


  experiences: Experience[] = null;
  loading = false;
  loaded = false;
  deleting = false;
  deleted = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.EXPERIENCES.EXPERIENCES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.EXPERIENCES.EXPERIENCES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.EXPERIENCES.EXPERIENCES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.EXPERIENCES.EXPERIENCES']}`);
      });
    });

    if (!this.experiences)
      this.store.dispatch(new ExperienceActions.FetchStart('admin'));

    this.store.select('experiences').subscribe(state => {
      this.experiences = state.experiences;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.deleting = state.deleting;
      this.deleted = state.deleted;
      this.errors = state.errors;


    });
  }

  onRefresh() {
    this.store.dispatch(new ExperienceActions.FetchStart('admin'));
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
        this.store.dispatch(new ExperienceActions.DeleteStart(id));
    });

  }

  onOpenDocuments(experienceId: number) {
    this.bottomSheet.open(ExperienceDocumentsComponent, {
      disableClose: true,
      data: { experienceId: experienceId }
    });
  }

  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);

}
