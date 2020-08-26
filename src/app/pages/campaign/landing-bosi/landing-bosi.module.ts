import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingBosiRoutingModule } from './landing-bosi-routing.module';
import { LandingBosiComponent } from './landing-bosi.component';
import { LoadingModule } from '@app/shared/loading/loading.module';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [ LandingBosiComponent ],
  exports: [ LandingBosiComponent ],
  imports: [
    CommonModule,
    RecaptchaModule,
    LandingBosiRoutingModule,
    LoadingModule
  ]
})
export class LandingBosiModule { }
