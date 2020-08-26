import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LandingBosiModule } from '../landing-bosi/landing-bosi.module';
import { LandingModule } from '../landing/landing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    LandingBosiModule,
    LandingModule
  ]
})
export class LayoutModule { }
