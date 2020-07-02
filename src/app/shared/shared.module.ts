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
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { CircleChartComponent } from './circle-chart/circle-chart.component';


@NgModule({
  declarations: [DiscardChangesComponent, ConfirmDialogComponent, ImgViewerComponent, ImagePickerComponent, FilePickerComponent, CircleChartComponent],
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
  ],
  exports: [
    CircleChartComponent
  ]
})
export class SharedModule { }
