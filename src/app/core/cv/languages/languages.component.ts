import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faGlobe, faFileAlt, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { ImgViewerComponent } from './../../../shared/img-viewer/img-viewer.component';
// import { PdfViewerComponent } from './../../../shared/pdf-viewer/pdf-viewer.component';
import { PdfViewer2Component } from './../../../shared/pdf-viewer2/pdf-viewer2.component';

import * as fromApp from '../../../store/app.reducer';
import * as LanguagesActions from '../../../admin/cv/languages/store/languages.actions';
import { Language } from './../../../models/language.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  faGlobe = faGlobe;
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faEye = faEye;

  languages: Language[] = null;
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
    this.translate.get(['CV.LANGUAGES.LANGUAGES']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.LANGUAGES.LANGUAGES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.LANGUAGES.LANGUAGES']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.LANGUAGES.LANGUAGES']}`);
      });
    });

    this.store.dispatch(new LanguagesActions.FetchStart());

    this.store.select('languages').subscribe(state => {
      this.languages = state.languages;
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

