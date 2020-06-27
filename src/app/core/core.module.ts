import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CoreLayoutComponent } from './core-layout/core-layout.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [
    CoreLayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
