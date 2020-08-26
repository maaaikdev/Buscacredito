import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
import { DetailModule } from './detail/detail.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@app/shared/loading/loading.module';

@NgModule({
  declarations: [ListingComponent],
  exports: [ListingComponent],
  imports: [
    CommonModule,
    ListingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DetailModule,
    LoadingModule
  ]
})
export class ListingModule { }
