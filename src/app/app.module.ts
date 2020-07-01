import { TrainingCoursesEffects } from './admin/cv/training-courses/store/courses.effects';
import { LanguagesEffects } from './admin/cv/languages/store/languages.effects';
import { ExperiencesEffects } from './admin/cv/experiences/store/experiences.effects';
import { EducationEffects } from './admin/cv/education/store/education.effects';
import { CVFilesEffects } from './admin/cv/cv-files/store/cvfiles.effects';
import { ContactInfoffects } from './admin/cv/contact-info/store/contactInfo.effects';
import { PersonalInfoffects } from './admin/cv/personal-info/store/personalInfo.effects';
import { VisitsEffects } from './admin/visits/store/visits.effects';
import { UsersEffects } from './admin/users/store/users.effects';
import { MessagingEffects } from './admin/messaging/store/messaging.effects';
import { FilesEffects } from './admin/files/store/files.effects';
import { SharedModule } from './shared/shared.module';
import { DirectoriesEffects } from './admin/directories/store/directories.effects';
import { AdminModule } from './admin/admin.module';
import { Authffects } from './security/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store';
import { CountUpModule } from 'ngx-countup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { NotFoundComponent } from './not-found/not-found.component';

import * as fromApp from './store/app.reducer';

// registerLocaleData(localeFr, 'fr');
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      Authffects,
      DirectoriesEffects,
      FilesEffects,
      MessagingEffects,
      UsersEffects,
      VisitsEffects,
      PersonalInfoffects,
      ContactInfoffects,
      CVFilesEffects,
      EducationEffects,
      ExperiencesEffects,
      LanguagesEffects,
      TrainingCoursesEffects
    ]),
    MaterialModule,
    CountUpModule,
    SharedModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
