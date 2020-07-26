import { ContactMeComponent } from './contact-me/contact-me.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ViewProjectComponent } from './portfolio/projects/view-project/view-project.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { DownloadCvComponent } from './cv/download-cv/download-cv.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreLayoutComponent } from './core-layout/core-layout.component';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './cv/cv.component';
import { EducationComponent } from './cv/education/education.component';
import { SkillsComponent } from './../core/cv/skills/skills.component';
import { PersonalInfoComponent } from './cv/personal-info/personal-info.component';
import { TrainingCoursesComponent } from './cv/training-courses/training-courses.component';
import { LanguagesComponent } from './cv/languages/languages.component';
import { ExperiencesComponent } from './cv/experiences/experiences.component';


const routes: Routes = [
    {
        path: '', component: CoreLayoutComponent, children: [
            {
                path: 'cv', component: CvComponent, children: [
                    { path: 'personal-info', component: PersonalInfoComponent },
                    { path: 'education', component: EducationComponent },
                    { path: 'experiences', component: ExperiencesComponent },
                    { path: 'languages', component: LanguagesComponent },
                    { path: 'training-courses', component: TrainingCoursesComponent },
                    { path: 'skills', component: SkillsComponent },
                    { path: 'download', component: DownloadCvComponent },
                    { path: '', redirectTo: 'personal-info', pathMatch: 'full' }
                ]
            },
            {
                path: 'portfolio', component: PortfolioComponent, children: [
                    { path: 'projects', component: ProjectsComponent },
                    { path: 'projects/:id/:slug', component: ViewProjectComponent },
                    { path: '', redirectTo: 'projects', pathMatch: 'full' }
                ]
            },
            { path: 'contact', component: ContactMeComponent },
            { path: '', component: HomeComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
