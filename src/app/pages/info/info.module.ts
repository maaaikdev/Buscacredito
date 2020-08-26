import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoComponent } from './info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@app/shared/loading/loading.module';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [InfoComponent],
  exports: [InfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
    LoadingModule
  ]
})
export class InfoModule { }
