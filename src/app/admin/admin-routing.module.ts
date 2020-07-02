import { SkillsComponent } from './cv/skills/skills.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { TrainingCoursesComponent } from './cv/training-courses/training-courses.component';
import { LanguagesComponent } from './cv/languages/languages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './../security/admin.guard';
import { AuthGuard } from './../security/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DirectoriesComponent } from './directories/directories.component';
import { FilesComponent } from './files/files.component';
import { FileUploadComponent } from './files/file-upload/file-upload.component';
import { EmailsComponent } from './messaging/emails/emails.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UsersComponent } from './users/users.component';
import { ContactInfoComponent } from './cv/contact-info/contact-info.component';
import { PersonalInfoComponent } from './cv/personal-info/personal-info.component';
import { ViewMessageComponent } from './messaging/view-message/view-message.component';
import { NewEmailComponent } from './messaging/new-email/new-email.component';
import { MessagesComponent } from './messaging/messages/messages.component';
import { EditExperienceComponent } from './cv/experiences/edit-experience/edit-experience.component';
import { ExperiencesComponent } from './cv/experiences/experiences.component';
import { EditEducationComponent } from './cv/education/edit-education/edit-education.component';
import { EducationComponent } from './cv/education/education.component';
import { CvFilesComponent } from './cv/cv-files/cv-files.component';

const routes: Routes = [
    {
        path: '', component: AdminLayoutComponent, children: [
            { path: '', component: DashboardComponent, pathMatch: 'full' },
            {
                path: 'cv',
                children: [
                    { path: 'personal-info', component: PersonalInfoComponent },
                    { path: 'contact-info', component: ContactInfoComponent },
                    { path: 'education', component: EducationComponent },
                    { path: 'education/create', component: EditEducationComponent },
                    { path: 'education/edit/:id', component: EditEducationComponent },
                    { path: 'experiences', component: ExperiencesComponent },
                    { path: 'experiences/create', component: EditExperienceComponent },
                    { path: 'experiences/edit/:id', component: EditExperienceComponent },
                    { path: 'languages', component: LanguagesComponent },
                    { path: 'skills', component: SkillsComponent },
                    { path: 'training-courses', component: TrainingCoursesComponent },
                    { path: 'cv-files', component: CvFilesComponent },
                ]
            },
            {
                path: 'portfolio',
                children: [
                    { path: 'projects', component: ProjectsComponent }
                ]
            },
            {
                path: 'directories', children: [
                    { path: '', component: DirectoriesComponent, pathMatch: 'full' }
                ]
            },
            {
                path: 'files', children: [
                    { path: '', component: FilesComponent, pathMatch: 'full' },
                    { path: 'upload', component: FileUploadComponent }
                ]
            },
            {
                path: 'messages', children: [
                    { path: '', component: MessagesComponent, pathMatch: 'full' },
                    { path: 'send-email', component: NewEmailComponent },
                    { path: 'sent-emails', component: EmailsComponent },
                    { path: ':id', component: ViewMessageComponent }
                ]
            },
            {
                path: 'users', children: [
                    { path: 'new-user', component: NewUserComponent },
                    { path: 'edit-user', component: NewUserComponent },
                    { path: '', component: UsersComponent, pathMatch: 'full' },
                ]
            },
        ],

        // canActivate: [AdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
