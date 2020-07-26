import { FilePickerComponent } from './../../../../shared/file-picker/file-picker.component';
import { ImagePickerComponent } from './../../../../shared/image-picker/image-picker.component';
import { ThemePalette } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import * as fromApp from '../../../../store/app.reducer';
import * as ProjectsActions from '../store/projects.actions';
import { Project } from './../../../../models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  editMode = false;

  colorAccent: ThemePalette = 'accent';

  public Editor = ClassicEditor;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  projects: Project[] = null;
  editedProjectId: number = null;
  loading = false;
  loaded = false;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  errors: string[] = null;

  checked = false;

  types = ['api', 'desktop', 'mobile', 'systems & networking', 'web'];
  sizes = ['small', 'mediumbig'];

  languages = ['en', 'fr'];
  currentLang: string = null;
  editLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.editLang = this.translate.currentLang;
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

    this.form = new FormGroup({
      name_EN: new FormControl(null, [Validators.required]),
      name_FR: new FormControl(null),
      description_EN: new FormControl(null, [Validators.required]),
      description_FR: new FormControl(null),
      type: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      isDisplayed: new FormControl(null),
      gitHubUrl: new FormControl(null),
      liveDemoUrl: new FormControl(null),
      videoDemoUrl: new FormControl(null),
      videoDemoUrlExt: new FormControl(null),
      imagePath: new FormControl(null, [Validators.required]),
    });

    if (!this.projects || this.projects.length === 0) {
      this.store.dispatch(new ProjectsActions.FetchStart());
    }

    this.store.select('projects').subscribe(state => {
      this.projects = state.projects;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.creating = state.creating;
      this.created = state.created;
      this.updating = state.updating;
      this.updated = state.updated;
      this.errors = state.errors;

      if (this.created || this.updated) {
        this.router.navigate(['/admin', 'portfolio', 'projects']);
      }



      this.route.params.subscribe((params: Params) => {
        if (params.id) {
          this.editMode = true;
          this.editedProjectId = +params.id;


          if (this.projects && this.projects.length > 0) {
            const project = this.projects.find(e => e.id === +params.id);

            this.form.patchValue({
              name_EN: project.name_EN,
              name_FR: project.name_FR,
              description_EN: project.description_EN,
              description_FR: project.description_FR,
              type: project.type,
              size: project.size,
              isDisplayed: project.isDisplayed,
              gitHubUrl: project.gitHubUrl,
              liveDemoUrl: project.liveDemoUrl,
              videoDemoUrl: project.videoDemoUrl,
              videoDemoUrlExt: project.videoDemoUrlExt,
              imagePath: project.imagePath,
            });
          }
        }
      });
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new ProjectsActions.CreateStart({
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        description_EN: this.form.value.description_EN,
        description_FR: this.form.value.description_FR,
        type: this.form.value.type,
        size: this.form.value.size,
        isDisplayed: this.form.value.isDisplayed ? this.form.value.isDisplayed : false,
        gitHubUrl: this.form.value.gitHubUrl,
        liveDemoUrl: this.form.value.liveDemoUrl,
        videoDemoUrl: this.form.value.videoDemoUrl,
        videoDemoUrlExt: this.form.value.videoDemoUrlExt,
        imagePath: this.form.value.imagePath,
      }));
    } else {
      this.store.dispatch(new ProjectsActions.UpdateStart({
        id: this.editedProjectId,
        name_EN: this.form.value.name_EN,
        name_FR: this.form.value.name_FR,
        description_EN: this.form.value.description_EN,
        description_FR: this.form.value.description_FR,
        type: this.form.value.type,
        size: this.form.value.size,
        isDisplayed: this.form.value.isDisplayed ? this.form.value.isDisplayed : false,
        gitHubUrl: this.form.value.gitHubUrl,
        liveDemoUrl: this.form.value.liveDemoUrl,
        videoDemoUrl: this.form.value.videoDemoUrl,
        videoDemoUrlExt: this.form.value.videoDemoUrlExt,
        imagePath: this.form.value.imagePath,
      }));
    }
  }


  onCancel() {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.CANCEL_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.CANCEL_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/admin', 'portfolio', 'projects']);
    });
  }


  selectImage() {
    var dialogRef = this.dialog.open(ImagePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { imagePath: string }) => {
      if (data) {
        this.form.patchValue({
          imagePath: data.imagePath
        });
      }
    });

  }

  selectFile(){
    var dialogRef = this.dialog.open(FilePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { filePath: string }) => {
      if (data) {
        this.form.patchValue({
          videoDemoUrl: data.filePath
        });
      }
    });
  }


  ngOnDestroy() {
    this.store.dispatch(new ProjectsActions.ClearErrors());
    this.store.dispatch(new ProjectsActions.ClearStatus());
    this.editMode = false;
    this.editedProjectId = null;
  }

}
