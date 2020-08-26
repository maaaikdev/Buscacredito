import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { ConfirmModule } from '../confirm/confirm.module';

@NgModule({
  declarations: [ProcessComponent],
  exports: [ProcessComponent],
  imports: [
    CommonModule,
    ConfirmModule
  ]
})
export class ProcessModule { }
