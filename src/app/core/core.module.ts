import { SharedModule } from './../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material-module';

import { CoreLayoutComponent } from './core-layout/core-layout.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { CvComponent } from './cv/cv.component';
import { EducationComponent } from './cv/education/education.component';
import { SkillsComponent } from './cv/skills/skills.component';
import { FooterComponent } from './footer/footer.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { PersonalInfoComponent } from './cv/personal-info/personal-info.component';
import { ExperiencesComponent } from './cv/experiences/experiences.component';
import { LanguagesComponent } from './cv/languages/languages.component';
import { TrainingCoursesComponent } from './cv/training-courses/training-courses.component';
import { DownloadCvComponent } from './cv/download-cv/download-cv.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';



@NgModule({
  declarations: [
    CoreLayoutComponent,
    HomeComponent,
    CvComponent,
    EducationComponent,
    SkillsComponent,
    FooterComponent,
    ToolBarComponent,
    PersonalInfoComponent,
    ExperiencesComponent,
    LanguagesComponent,
    TrainingCoursesComponent,
    DownloadCvComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    TranslateModule,
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
