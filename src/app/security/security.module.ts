import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SecurityRoutingModule } from './security-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



@NgModule({
    declarations: [
        AuthLayoutComponent,
        AuthComponent,
        AccessDeniedComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule,
        SecurityRoutingModule
    ],
    exports: [],
    providers: [
        // {
        //     provide: RECAPTCHA_SETTINGS,
        //     useValue: { siteKey: '<ghtBHreVgsfZRgsQSD578dh5HTUtyjTYJUIuyotuiytOyt864uRNryjtUOYTUO>' } as RecaptchaSettings,
        // },
    ],
})
export class SecurityModule { }