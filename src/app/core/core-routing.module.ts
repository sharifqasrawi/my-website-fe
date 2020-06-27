import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoreLayoutComponent } from './core-layout/core-layout.component';


const routes: Routes = [
    {
        path: '', component: CoreLayoutComponent, children: [
            { path: '', component: HomeComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
