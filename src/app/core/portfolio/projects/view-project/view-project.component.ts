import { ImgsViewerComponent } from './../../../../shared/imgs-viewer/imgs-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { ImgViewerComponent } from './../../../../shared/img-viewer/img-viewer.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { faTags, faBackward, faImages, faVideo } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as ProjectsActions from '../../../../admin/portfolio/projects/store/projects.actions'
import { Project } from './../../../../models/project.model';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  faTags = faTags;
  faBackward = faBackward;
  faImages = faImages;
  faVideo = faVideo;

  mobileQuery: MediaQueryList;

  projects: Project[] = null;
  project: Project = null;
  projectId: number;
  loading = false;
  loaded = false;
  errors: string[] = null;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['PORTFOLIO.PORTFOLIO']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['PORTFOLIO.PORTFOLIO']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['PORTFOLIO.PORTFOLIO']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['PORTFOLIO.PORTFOLIO']}`);
      });
    });

    this.route.params.subscribe((params: Params) => {
      this.projectId = +params.id;


      if (!this.projects)
        this.store.dispatch(new ProjectsActions.FetchStart());

      this.store.select('projects').subscribe(state => {
        this.projects = state.projects;
        this.project = state.projects.find(p => p.id === this.projectId);
        this.loading = state.loading;
        this.loaded = state.loaded;
        this.errors = state.errors;


        if (this.project) {
          this.breadcrumbLinks = [
            { url: '/', label: 'Home', translate: true },
            { url: '/portfolio', label: 'PORTFOLIO', translate: true },
            { label: this.currentLang === 'en' ? this.project.name_EN : this.project.name_FR, translate: false },
          ];
        }
      });
    });


  }

  onSelectProject(id: number) {
    const project = this.projects.find(p => p.id === id);
    let slug = project.slug_EN;
    if (this.currentLang === 'fr')
      slug = project.slug_FR;

    this.router.navigate(['/portfolio', 'projects', id, slug]);
  }

  onViewImage(downloadPath: string) {
    // const dialogRef = this.dialog.open(ImgViewerComponent, {
    //   data: { path: downloadPath },
    //   panelClass: ['no-padding', 'no-scrolls'],
    //   backdropClass: 'backdropBg',
    // });

    const images = [this.project.imagePath, ...this.project.projectImages.map(x => x.path)];

    const indx = images.findIndex(i => i === downloadPath);

    const dialogRef = this.dialog.open(ImgsViewerComponent, {
      data: { images: images, index: indx },
      panelClass: ['no-padding', 'no-scrolls'],
      backdropClass: 'backdropBg',
    });
  }

  getSanitizedImage = (path: string) => this.sanitizer.bypassSecurityTrustResourceUrl(path);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}
