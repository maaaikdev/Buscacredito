import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ConfirmModule { }
