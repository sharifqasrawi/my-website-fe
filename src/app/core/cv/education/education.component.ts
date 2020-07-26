import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faGraduationCap, faFileAlt, faDownload, faEye, faAsterisk } from '@fortawesome/free-solid-svg-icons';

// import { PdfViewerComponent } from './../../../shared/pdf-viewer/pdf-viewer.component';
import { PdfViewer2Component } from './../../../shared/pdf-viewer2/pdf-viewer2.component';
import { ImgViewerComponent } from './../../../shared/img-viewer/img-viewer.component';

import * as fromApp from '../../../store/app.reducer';
import * as EducationActions from '../../../admin/cv/education/store/education.actions';
import { Education } from './../../../models/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  faGraduationCap = faGraduationCap;
  faFileAlt = faFileAlt;
  faAsterisk = faAsterisk;
  faDownload = faDownload;
  faEye = faEye;

  educations: Education[] = null;
  loading = false;
  loaded = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.EDUCATION.EDUCATION']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.EDUCATION.EDUCATION']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.EDUCATION.EDUCATION']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.EDUCATION.EDUCATION']}`);
      });
    });

    this.store.dispatch(new EducationActions.FetchStart());

    this.store.select('education').subscribe(state => {
      this.educations = state.educations;
      this.loaded = state.loaded;
      this.loading = state.loading;
      this.errors = state.errors;
    });
  }

  onViewPdf(path: string) {
    // const dialogRef = this.dialog.open(PdfViewerComponent, {
    //   width: '750px',
    //   data: { filePath: path }
    // });

    const dialogRef = this.dialog.open(PdfViewer2Component, {
      width: '100%',
      panelClass: ['no-padding', 'no-scrolls', 'no-margin'],
      backdropClass: 'backdropBg',
      data: { filePath: path }
    });
  }

  onViewImage(path: string) {
    const dialogRef = this.dialog.open(ImgViewerComponent, {
      width: '750px',
      data: { filePath: path }
    });
  }
}
