import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { faDownload, faAsterisk, faGlobe, faFile, faClock } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as CVFilesActions from '../../../admin/cv/cv-files/store/cvfiles.actions';
import { CVFile } from './../../../models/cvFile.model';

@Component({
  selector: 'app-download-cv',
  templateUrl: './download-cv.component.html',
  styleUrls: ['./download-cv.component.css']
})
export class DownloadCvComponent implements OnInit {

  faDownload = faDownload;
  faAsterisk = faAsterisk;
  faGlobe = faGlobe;
  faFile = faFile;
  faClock = faClock;

  files: CVFile[] = null;
  loading = false;
  loaded = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.CV_FILES.CV_FILES']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.CV_FILES.CV_FILES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.CV_FILES.CV_FILES']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.CV_FILES.CV_FILES']}`);
      });
    });

    this.store.dispatch(new CVFilesActions.FetchStart());

    this.store.select('cvFiles').subscribe(state => {
      this.files = state.cvFiles;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.errors = state.errors;
    });
  }

}
