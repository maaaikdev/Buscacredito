import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { ProcessModule } from '../process/process.module';
import { ProductModule } from '@app/shared/product/product.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DetailComponent],
  exports: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    ProcessModule,
    ProductModule,
    RouterModule
  ]
})
export class DetailModule { }
