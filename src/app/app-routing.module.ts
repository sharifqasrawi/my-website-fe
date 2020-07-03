import { AuthGuard } from './security/auth.guard';
import { AdminGuard } from './security/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreLayoutComponent } from './core/core-layout/core-layout.component';


const routes: Routes = [
  // { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    ,
    canActivate: [AdminGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
