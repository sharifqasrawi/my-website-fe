import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularImageViewerModule } from "angular-x-image-viewer";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { MaterialModule } from '../material-module';
import { DiscardChangesComponent } from './discard-changes/discard-changes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { CircleChartComponent } from './circle-chart/circle-chart.component';
import { TextHeaderComponent } from './text-header/text-header.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ImgsViewerComponent } from './imgs-viewer/imgs-viewer.component';
import { PdfViewer2Component } from './pdf-viewer2/pdf-viewer2.component';


@NgModule({
  declarations: [DiscardChangesComponent, ConfirmDialogComponent, ImgViewerComponent, ImagePickerComponent, FilePickerComponent, CircleChartComponent, TextHeaderComponent, PdfViewerComponent, BreadcrumbComponent, ImgsViewerComponent, PdfViewer2Component],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatButtonModule,
    PdfViewerModule,
    FontAwesomeModule,
    TranslateModule,
    AngularImageViewerModule,
    NgxExtendedPdfViewerModule,
    RouterModule
  ],
  exports: [
    CircleChartComponent,
    TextHeaderComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
