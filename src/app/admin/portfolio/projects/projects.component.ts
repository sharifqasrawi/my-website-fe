import { EditProjectTagsComponent } from './edit-project-tags/edit-project-tags.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faTrash, faEdit, faTags } from '@fortawesome/free-solid-svg-icons';

import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Project } from './../../../models/project.model';
import * as fromApp from '../../../store/app.reducer';
import * as ProjectsActions from './store/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  faProjectDiagram = faProjectDiagram;
  faEdit = faEdit;
  faTrash = faTrash;
  faTags = faTags;

  projects: Project[] = null;
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
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['PORTFOLIO.PROJECTS.PROJECTS']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['PORTFOLIO.PROJECTS.PROJECTS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['PORTFOLIO.PROJECTS.PROJECTS']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['PORTFOLIO.PROJECTS.PROJECTS']}`);
      });
    });

    if (!this.projects)
      this.store.dispatch(new ProjectsActions.FetchStart());

    this.store.select('projects').subscribe(state => {
      this.projects = state.projects;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.deleting = state.deleting;
      this.deleted = state.deleted;
      this.errors = state.errors;

    });
  }

  onRefresh() {
    this.store.dispatch(new ProjectsActions.FetchStart());
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
        this.store.dispatch(new ProjectsActions.DeleteStart(id));
    });

  }

  onEditTags(id: number) {
    const dialogRef = this.dialog.open(EditProjectTagsComponent, {
      width: '700px',
      disableClose: true,
      data: { projectId: id }
    });
  }

}
