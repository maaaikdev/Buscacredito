import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaRoutingModule } from './oferta-routing.module';
import { OfertaComponent } from './oferta.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { LoadingModule } from '@app/shared/loading/loading.module';

@NgModule({
  declarations: [ OfertaComponent ],
  exports: [ OfertaComponent ],
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule,
    OfertaRoutingModule,    
    LoadingModule
  ]
})

export class OfertaModule {

}