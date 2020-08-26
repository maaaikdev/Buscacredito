import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { ConfirmModule } from '@app/pages/listing/confirm/confirm.module';

@NgModule({
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
  imports: [
    CommonModule,
    ConfirmModule
  ]
})
export class ErrorModule { }
