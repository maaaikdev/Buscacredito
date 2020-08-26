import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { LoadingModule } from '@app/shared/loading/loading.module';

@NgModule({
  declarations: [ LandingComponent ],
  exports: [ LandingComponent ],
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule,
    LandingRoutingModule,    
    LoadingModule
  ]
})
export class LandingModule { }
