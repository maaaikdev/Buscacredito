import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';
import { LoadingModule } from '@app/shared/loading/loading.module';

@NgModule({
  declarations: [RequestComponent],
  exports: [RequestComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    LoadingModule
  ]
})
export class RequestModule { }
