import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { faTags, faProjectDiagram, faSearch } from '@fortawesome/free-solid-svg-icons';

import * as ProjectsActions from '../../../admin/portfolio/projects/store/projects.actions';
import * as fromApp from '../../../store/app.reducer';
import { Project } from './../../../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  faTags = faTags;
  faProjectDiagram = faProjectDiagram;
  faSearch = faSearch;

  projects: Project[] = null;
  filteredProjects: Project[] = null;
  loading = false;
  loaded = false;
  errors: string[] = null;

  searchForm: FormGroup;
  types = ['all', 'api', 'desktop', 'mobile', 'systems & networking', 'web'];
  type: string;
  sizes = ['all', 'small', 'mediumbig'];
  size: string;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title
  ) { }


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

    if (!this.projects)
      this.store.dispatch(new ProjectsActions.FetchStart());

    this.store.select('projects').subscribe(state => {
      this.projects = state.projects;
      this.filteredProjects = this.projects;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.errors = state.errors;
    });

    this.searchForm = new FormGroup({
      name: new FormControl(null)
    });

    this.breadcrumbLinks = [
      { url: '/', label: 'Home', translate: true },
      { label: 'PORTFOLIO', translate: true },
    ];

  }
  onRefresh() {
    this.store.dispatch(new ProjectsActions.FetchStart());
    this.searchForm.reset();
    this.type = null;
    this.size = null;
  }

  onSearch() {
    const searchKey: string = this.searchForm.value.name;

    if (searchKey == '' || searchKey === null) {
      this.filteredProjects = this.projects;
    } else {
      if (this.currentLang === 'en')
        this.filteredProjects = this.projects.filter(c => c.name_EN.toLowerCase().includes(searchKey.toLowerCase()));
      else if (this.currentLang === 'fr')
        this.filteredProjects = this.projects.filter(c => c.name_FR.toLowerCase().includes(searchKey.toLowerCase()));

    }
  }

  onFilterByType() {
    if (this.type == '' || this.type === null || this.type === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(c => c.type.toLowerCase().includes(this.type.toLowerCase()));
    }
  }

  onFilterBySize() {
    if (this.size == '' || this.size === null || this.size === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(c => c.size.toLowerCase().includes(this.size.toLowerCase()));
    }
  }


  onClearSearch() {
    this.searchForm.reset();
    this.onSearch();
  }


}
