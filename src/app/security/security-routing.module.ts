import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: 'auth', component: AuthComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'access-denied', component: AccessDeniedComponent },
            { path: '', redirectTo: '/security/auth', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }
