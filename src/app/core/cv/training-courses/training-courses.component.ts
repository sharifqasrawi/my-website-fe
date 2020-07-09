import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faListAlt, faFileAlt, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';

import { PdfViewerComponent } from './../../../shared/pdf-viewer/pdf-viewer.component';
import { ImgViewerComponent } from './../../../shared/img-viewer/img-viewer.component';
import * as fromApp from '../../../store/app.reducer';
import * as TrainingCoursesActions from '../../../admin/cv/training-courses/store/courses.actions';
import { TrainingCourse } from './../../../models/trainingCourse.model';


@Component({
  selector: 'app-training-courses',
  templateUrl: './training-courses.component.html',
  styleUrls: ['./training-courses.component.css']
})
export class TrainingCoursesComponent implements OnInit {

  faListAlt = faListAlt;
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faEye = faEye;


  courses: TrainingCourse[] = null;
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
    this.translate.get(['CV.COURSES.COURSES']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.COURSES.COURSES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.COURSES.COURSES']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.COURSES.COURSES']}`);
      });
    });

    this.store.dispatch(new TrainingCoursesActions.FetchStart());

    this.store.select('courses').subscribe(state => {
      this.courses = state.courses;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.errors = state.errors;

    });
  }

  
  onViewPdf(path: string) {
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      width: '750px',
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
