import { ImgsViewerComponent } from './../../../../shared/imgs-viewer/imgs-viewer.component';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { EditProjectImageComponent } from './edit-project-image/edit-project-image.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { faImages, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Project } from './../../../../models/project.model';
import * as fromApp from '../../../../store/app.reducer';
import * as ProjectsActions from './../store/projects.actions'


@Component({
  selector: 'app-project-images',
  templateUrl: './project-images.component.html',
  styleUrls: ['./project-images.component.css']
})
export class ProjectImagesComponent implements OnInit {

  faImages = faImages;
  faTrash = faTrash;
  faEdit = faEdit;

  projects: Project[] = null;
  project: Project = null;
  projectId: number;
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
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['PORTFOLIO.PROJECTS.IMAGES.PROJECT_IMAGES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['PORTFOLIO.PROJECTS.IMAGES.PROJECT_IMAGES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['PORTFOLIO.PROJECTS.IMAGES.PROJECT_IMAGES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['PORTFOLIO.PROJECTS.IMAGES.PROJECT_IMAGES']}`);
      });
    });


    this.route.params.subscribe((params: Params) => {
      this.projectId = +params.id;

      if (!this.projects)
        this.store.dispatch(new ProjectsActions.FetchStart('admin'));

      this.store.select('projects').subscribe(state => {
        this.projects = state.projects;
        this.project = state.projects.find(p => p.id === this.projectId);
        this.loading = state.loading;
        this.loaded = state.loaded;
        this.deleting = state.deletingImage;
        this.deleted = state.deletedImage;
        this.errors = state.errorsImages;

      });
    });
  }

  onRefresh() {
    this.store.dispatch(new ProjectsActions.FetchStart('admin'));
  }


  onAddImage() {
    const dialogRef = this.dialog.open(EditProjectImageComponent, {
      width: '700px',
      disableClose: true,
      data: { editMode: false, projectId: this.projectId }
    });
  }

  onEditImage(id: number) {
    const img = this.project.projectImages.find(i => i.id === id);
    const dialogRef = this.dialog.open(EditProjectImageComponent, {
      width: '700px',
      disableClose: true,
      data: {
        editMode: true,
        projectId: this.projectId,
        id: id,
        caption_EN: img.caption_EN,
        caption_FR: img.caption_FR,
        path: img.path,
        isDisplayed: img.isDisplayed
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
        this.store.dispatch(new ProjectsActions.DeleteImageStart(id));
    });

  }

 
  onViewImage(downloadPath: string) {
    const images = this.project.projectImages.map(x => x.path);

    const indx = images.findIndex(i => i === downloadPath);

    const dialogRef = this.dialog.open(ImgsViewerComponent, {
      data: { images: images, index: indx },
      panelClass: ['no-padding', 'no-scrolls'],
      backdropClass: 'backdropBg',
    });
  }
}
