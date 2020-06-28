import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material-module';
import { DirectoriesComponent } from './directories/directories.component';
import { EditDirectoryComponent } from './directories/edit-directory/edit-directory.component';
import { PhysicalDirectoriesComponent } from './directories/physical-directories/physical-directories.component';
import { FilesComponent } from './files/files.component';
import { FileUploadComponent } from './files/file-upload/file-upload.component';
import { DragAndDropDirectiveDirective } from './files/drag-and-drop-directive.directive';
import { MessagesComponent } from './messaging/messages/messages.component';
import { EmailsComponent } from './messaging/emails/emails.component';
import { NewEmailComponent } from './messaging/new-email/new-email.component';
import { ViewMessageComponent } from './messaging/view-message/view-message.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { CountUpModule } from 'ngx-countup';
import { VisitsComponent } from './visits/visits.component';
import { VisitDetailsComponent } from './visits/visit-details/visit-details.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    DragAndDropDirectiveDirective,
    DashboardComponent,
    DirectoriesComponent,
    EditDirectoryComponent,
    PhysicalDirectoriesComponent,
    FilesComponent,
    FileUploadComponent,
    MessagesComponent,
    EmailsComponent,
    NewEmailComponent,
    ViewMessageComponent,
    UsersComponent,
    NewUserComponent,
    VisitsComponent,
    VisitDetailsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    CountUpModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    TranslateModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
