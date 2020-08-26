import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingBosiComponent } from './landing-bosi.component';

const routes: Routes = [
  {
    path: '',
    component: LandingBosiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingBosiRoutingModule { }
