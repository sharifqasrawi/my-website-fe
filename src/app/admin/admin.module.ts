import { SharedModule } from './../shared/shared.module';
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
import { PersonalInfoComponent } from './cv/personal-info/personal-info.component';
import { ContactInfoComponent } from './cv/contact-info/contact-info.component';
import { CvFilesComponent } from './cv/cv-files/cv-files.component';
import { EducationComponent } from './cv/education/education.component';
import { EditEducationComponent } from './cv/education/edit-education/edit-education.component';
import { ExperiencesComponent } from './cv/experiences/experiences.component';
import { EditExperienceComponent } from './cv/experiences/edit-experience/edit-experience.component';
import { LanguagesComponent } from './cv/languages/languages.component';
import { EditLanguageComponent } from './cv/languages/edit-language/edit-language.component';
import { TrainingCoursesComponent } from './cv/training-courses/training-courses.component';
import { EditTrainingCourseComponent } from './cv/training-courses/edit-training-course/edit-training-course.component';
import { ExperienceDocumentsComponent } from './cv/experiences/experience-documents/experience-documents.component';
import { EditExperienceDocumentComponent } from './cv/experiences/experience-documents/edit-experience-document/edit-experience-document.component';
import { EducationDocumentsComponent } from './cv/education/education-documents/education-documents.component';
import { EditEducationDocumentComponent } from './cv/education/education-documents/edit-education-document/edit-education-document.component';
import { LanguageDocumentsComponent } from './cv/languages/language-documents/language-documents.component';
import { EditLanguageDocumentComponent } from './cv/languages/language-documents/edit-language-document/edit-language-document.component';
import { CourseDocumentsComponent } from './cv/training-courses/courses-documents/courses-documents.component';
import { EditCourseDocumentComponent } from './cv/training-courses/courses-documents/edit-courses-document/edit-courses-document.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { SkillsComponent } from './cv/skills/skills.component';
import { EditCategoryComponent } from './cv/skills/edit-category/edit-category.component';
import { EditSkillComponent } from './cv/skills/edit-skill/edit-skill.component';
import { TagsComponent } from './tags/tags.component';
import { EditProjectComponent } from './portfolio/projects/edit-project/edit-project.component';
import { EditProjectTagsComponent } from './portfolio/projects/edit-project-tags/edit-project-tags.component';
import { ProjectImagesComponent } from './portfolio/projects/project-images/project-images.component';
import { EditProjectImageComponent } from './portfolio/projects/project-images/edit-project-image/edit-project-image.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';



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
    VisitDetailsComponent,
    PersonalInfoComponent,
    ContactInfoComponent,
    CvFilesComponent,
    EducationComponent,
    EditEducationComponent,
    ExperiencesComponent,
    EditExperienceComponent,
    LanguagesComponent,
    EditLanguageComponent,
    TrainingCoursesComponent,
    EditTrainingCourseComponent,
    ExperienceDocumentsComponent,
    EditExperienceDocumentComponent,
    EducationDocumentsComponent,
    EditEducationDocumentComponent,
    LanguageDocumentsComponent,
    EditLanguageDocumentComponent,
    CourseDocumentsComponent,
    EditCourseDocumentComponent,
    ProjectsComponent,
    SkillsComponent,
    EditCategoryComponent,
    EditSkillComponent,
    TagsComponent,
    EditProjectComponent,
    EditProjectTagsComponent,
    ProjectImagesComponent,
    EditProjectImageComponent,
    ResetPasswordComponent,
    ToDoListComponent
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
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
