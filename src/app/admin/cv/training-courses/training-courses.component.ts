import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { TrainingCourse } from './../../../models/trainingCourse.model';
import { EditTrainingCourseComponent } from './edit-training-course/edit-training-course.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { faListAlt, faEdit, faTrash, faLink, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { CourseDocumentsComponent } from './courses-documents/courses-documents.component';
import * as fromApp from '../../../store/app.reducer';
import * as TrainingCoursesActions from './store/courses.actions';

@Component({
  selector: 'app-training-courses',
  templateUrl: './training-courses.component.html',
  styleUrls: ['./training-courses.component.css']
})
export class TrainingCoursesComponent implements OnInit {

  faListAlt = faListAlt;
  faEdit = faEdit;
  faTrash = faTrash;
  faLink = faLink;
  faFileAlt = faFileAlt;


  courses: TrainingCourse[] = null;
  loading = false;
  loaded = false;
  deleting = false;
  deleted = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.COURSES.COURSES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.COURSES.COURSES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.COURSES.COURSES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.COURSES.COURSES']}`);
      });
    });

    this.store.dispatch(new TrainingCoursesActions.FetchStart());

    this.store.select('courses').subscribe(state => {
      this.courses = state.courses;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.deleting = state.deleting;
      this.deleted = state.deleted;
      this.errors = state.errors;
    });


  }

  onRefresh() {
    this.store.dispatch(new TrainingCoursesActions.FetchStart());
  }

  onAdd() {
    const dialogRef = this.dialog.open(EditTrainingCourseComponent, {
      width: '750px',
      disableClose: true,
      data: { editMode: false }
    });
  }
  onEdit(id: number) {
    const course = this.courses.find(c => c.id === id);
    const dialogRef = this.dialog.open(EditTrainingCourseComponent, {
      width: '750px',
      disableClose: true,
      data: {
        editMode: true,
        id: course.id,
        name: course.name,
        type: course.type,
        duration: course.duration,
        courseUrl: course.courseUrl,
        dateTime: course.dateTime,
        establishment: course.establishment,
        country_EN: course.country_EN,
        country_FR: course.country_FR,
        city_EN: course.city_EN,
        city_FR: course.city_FR,
      }
    });
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
        this.store.dispatch(new TrainingCoursesActions.DeleteStart(id));
    });

  }

  onOpenDocuments(courseId: number) {
    this.bottomSheet.open(CourseDocumentsComponent, {
      disableClose: true,
      data: { courseId: courseId}
    });
  }
}
