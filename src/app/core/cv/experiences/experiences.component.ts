import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { faBriefcase, faFileAlt, faAsterisk, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';

// import { PdfViewerComponent } from './../../../shared/pdf-viewer/pdf-viewer.component';
import { PdfViewer2Component } from './../../../shared/pdf-viewer2/pdf-viewer2.component';
import { ImgViewerComponent } from './../../../shared/img-viewer/img-viewer.component';

import * as fromApp from '../../../store/app.reducer';
import * as ExperiencesActions from '../../../admin/cv/experiences/store/experiences.actions';
import { Experience } from './../../../models/experience.model';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

  faBriefcase = faBriefcase;
  faFileAlt = faFileAlt;
  faAsterisk = faAsterisk;
  faDownload = faDownload;
  faEye = faEye;

  experiences: Experience[] = null;
  loading = false;
  loaded = false;
  errors: string[] = null;

  currentYear: number;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.EXPERIENCES.EXPERIENCES']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.EXPERIENCES.EXPERIENCES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.EXPERIENCES.EXPERIENCES']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.EXPERIENCES.EXPERIENCES']}`);
      });
    });

    this.currentYear = new Date().getFullYear();

    this.store.dispatch(new ExperiencesActions.FetchStart());

    this.store.select('experiences').subscribe(state => {
      this.experiences = state.experiences;
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

  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}
