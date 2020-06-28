import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material-module';
import { DiscardChangesComponent } from './discard-changes/discard-changes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';


@NgModule({
  declarations: [DiscardChangesComponent, ConfirmDialogComponent, ImgViewerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatButtonModule,
    FontAwesomeModule,
    TranslateModule,
    RouterModule
  ]
})
export class SharedModule { }
