import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LanguageDocumentsComponent } from './../languages/language-documents/language-documents.component';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { Language } from './../../../models/language.model';
import { EditLanguageComponent } from './edit-language/edit-language.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faGlobe, faEdit, faTrashAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as LanguagesActions from './store/languages.actions';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit, OnDestroy {

  faGlobe = faGlobe;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  faFileAlt = faFileAlt;


  languages: Language[] = null;
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
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['CV.LANGUAGES.LANGUAGES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['CV.LANGUAGES.LANGUAGES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;

      this.translate.get(['CV.LANGUAGES.LANGUAGES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['CV.LANGUAGES.LANGUAGES']}`);
      });
    });

    this.store.dispatch(new LanguagesActions.FetchStart());

    this.store.select('languages').subscribe(state => {
      this.languages = state.languages;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.errors = state.errors;
    });
  }

  onRefresh() {
    this.store.dispatch(new LanguagesActions.FetchStart());
  }

  onAdd() {
    const dialogRef = this.dialog.open(EditLanguageComponent, {
      width: '750px',
      disableClose: true,
      data: { editMode: false }
    });
  }

  onEdit(id: number, name_EN: string, name_FR: string, levelRead: number, levelSpeak: number, levelWrite: number) {
    const dialogRef = this.dialog.open(EditLanguageComponent, {
      width: '750px',
      disableClose: true,
      data: { id: id, name_EN: name_EN, name_FR: name_FR, levelSpeak: levelSpeak, levelRead: levelRead, levelWrite: levelWrite, editMode: true }
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
        this.store.dispatch(new LanguagesActions.DeleteStart(id));
    });

  }

  onOpenDocuments(languageId: number) {
    this.bottomSheet.open(LanguageDocumentsComponent, {
      disableClose: true,
      data: { languageId: languageId }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new LanguagesActions.ClearErrors());
    this.store.dispatch(new LanguagesActions.ClearStatus());
  }
}
