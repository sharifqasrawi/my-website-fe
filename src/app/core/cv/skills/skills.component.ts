import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Category } from './../../../models/category.model';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Skill } from './../../../models/skill.model';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as SkillsActions from '../../../admin/cv/skills/store/skills.actions';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  faStar = faStar;

  skillCategories: Category[] = null;
  filteredSkillCategories: Category[] = null;
  loading = false;
  loaded = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.SKILLS.SKILLS']).subscribe(trans => {
      this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.SKILLS.SKILLS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.SKILLS.SKILLS']).subscribe(trans => {
        this.titleService.setTitle(`Sharif Qasrawi - ${trans['CV.SKILLS.SKILLS']}`);
      });
    });

    this.store.dispatch(new SkillsActions.FetchCategoriesStart());

    this.store.select('skills').subscribe(state => {
      this.skillCategories = state.skillCategories.filter(c => c.skills.length > 0);
      this.filteredSkillCategories = this.skillCategories;
      this.loaded = state.loadedCategories;
      this.loading = state.loadingCategories;
      this.errors = state.errors;
    });
  }

  onSelectCategory(event) {
    if (event.value === 'all') {
      this.filteredSkillCategories = this.skillCategories;
    } else {
      if (this.currentLang === 'en') {
        this.filteredSkillCategories = this.skillCategories.filter(c => c.name_EN === event.value);
      } else {
        this.filteredSkillCategories = this.skillCategories.filter(c => c.name_FR === event.value);
      }
    }
  }
}


