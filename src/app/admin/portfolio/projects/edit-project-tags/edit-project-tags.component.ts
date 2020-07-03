import { Tag } from './../../../../models/tag.model';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { faTags, faTag, faTimesCircle, faPlusCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as TagsActions from '../../../tags/store/tags.actions';
import * as ProjectsActions from '../store/projects.actions';

interface DialogData {
  projectId: number,
}

@Component({
  selector: 'app-edit-project-tags',
  templateUrl: './edit-project-tags.component.html',
  styleUrls: ['./edit-project-tags.component.css']
})
export class EditProjectTagsComponent implements OnInit {

  faTags = faTags;
  faTag = faTag;
  faTimesCircle = faTimesCircle;
  faPlusCircle = faPlusCircle;
  faPlus = faPlus;
  faTrash = faTrash;

  projectId: number;
  tags: Tag[];

  allTags: Tag[] = null;
  projectTags: Tag[] = [];
  otherTags: Tag[] = [];

  updating = false;

  errors: string[] = null;


  constructor(
    public dialogRef: MatDialogRef<EditProjectTagsComponent>,
    private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.projectId = this.data.projectId;
    if (!this.allTags)
      this.store.dispatch(new TagsActions.FetchStart());

    this.store.select('tags').subscribe(state => {
      this.allTags = state.tags;

      if (this.allTags) {

        this.store.select('projects').subscribe(state => {
          this.updating = state.updating;

          this.tags = state.projects.find(c => c.id === this.projectId).tags;
          this.otherTags = this.allTags.filter(this.comparer(this.tags));

          if (state.updated)
            this.otherTags = this.allTags.filter(this.comparer(this.tags));

        });
      }
    });

    this.store.select('projects').subscribe(state => {
      this.updating = state.updatingTags;
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }


  onAddRemoveTag(tagId: number, action: string) {
    this.store.dispatch(new ProjectsActions.AddRemoveTagStart({
      projectId: this.projectId,
      tagId: tagId,
      action: action
    }));
  }

  onRefresh() {
    this.otherTags = this.allTags.filter(this.comparer(this.tags));
  }

  comparer(otherArray) {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.id === current.id
      }).length == 0;
    }
  }

}
