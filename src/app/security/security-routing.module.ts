import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: 'auth', component: AuthComponent },
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
