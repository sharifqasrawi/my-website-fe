import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Category } from './../../../models/category.model';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { faStar, faTrash, faEdit, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { EditCategoryComponent } from './edit-category/edit-category.component';

import * as fromApp from '../../../store/app.reducer';
import * as SkillsActions from './store/skills.actions';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  faStar = faStar;
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  skillCategories: Category[] = null;
  loadingCategories = false;
  loadedCategories = false;
  loadingSkills = false;
  loadedSkills = false;
  deletingCategory = false;
  deletedCategory = false;
  deletingSkill = false;
  deletedSkill = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.SKILLS.SKILLS']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.SKILLS.SKILLS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.SKILLS.SKILLS']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.SKILLS.SKILLS']}`);
      });
    });

    if (!this.skillCategories)
      this.store.dispatch(new SkillsActions.FetchCategoriesStart());

    this.store.select('skills').subscribe(state => {
      this.skillCategories = state.skillCategories;
      this.loadingCategories = state.loadingCategories;
      this.loadedCategories = state.loadedCategories;
      this.loadingSkills = state.loadingSkills;
      this.loadedSkills = state.loadedSkills;
      this.deletingCategory = state.deletingCategory;
      this.deletedCategory = state.deletedCategory;
      this.errors = state.errors;

    });

  }

  onRefresh() {
    this.store.dispatch(new SkillsActions.FetchCategoriesStart());
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '550px',
      disableClose: true,
      data: { editMode: false }
    });
  }

  onEditCategory(categoryId: number) {
    const category = this.skillCategories.find(c => c.id === categoryId);
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '550px',
      disableClose: true,
      data: { editMode: true, categoryId: categoryId, name_EN: category.name_EN, name_FR: category.name_FR }
    });
  }

  onAddSkill(categoryId: number) {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '550px',
      disableClose: true,
      data: { editMode: false, categoryId: categoryId }
    });
  }

  onDeleteCategory(categoryId: number) {
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
        this.store.dispatch(new SkillsActions.DeleteCategoryStart(categoryId));
    });
  }

  onDeleteSkill(skillId: number) {
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
        this.store.dispatch(new SkillsActions.DeleteSkillStart(skillId));
    });
  }

  onEditSkill(skillId: number, categoryId: number) {
    const skill = this.skillCategories.find(c => c.id === categoryId).skills.find(s => s.id === skillId);
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '550px',
      disableClose: true,
      data: {
        editMode: true,
        skillId: skillId,
        categoryId: categoryId,
        name_EN: skill.name_EN,
        name_FR: skill.name_FR,
        level: skill.level
      }
    });
  }

}
