import { NgModule } from '@angular/core';

// Routes
import { Routes, RouterModule } from '@angular/router';

// Guard service
import { CanActiveViaAuthGuard } from './core/services/auth-guard.service';

// Components
import { HomeComponent } from './pages/home/home.component';
import { DataComponent } from './pages/data/data.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomeBlogComponent } from './pages/blog/home-blog/home-blog.component';
import { StateComponent } from './pages/state/state.component';
import { CreditCardComponent } from './pages/campaign/credit-card/credit-card.component';
import { LandingConfirmComponent } from './pages/campaign/landing-confirm/landing-confirm.component';
import { FinancialInfoComponent } from './pages/financial-info/financial-info.component';
import { CanActiveViaIncomeInfo } from './core/services/income-info.service';
import { NewOffersComponent } from './pages/new-offers/new-offers.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [CanActiveViaAuthGuard] },
  // { path: 'ofertas', loadChildren: './pages/listing/listing.module#ListingModule', pathMatch: 'full', canActivate: [CanActiveViaIncomeInfo]},
  { path: 'ofertas', component: NewOffersComponent, canActivate: [CanActiveViaIncomeInfo,CanActiveViaAuthGuard]},
  // { path: 'ofertas/detalle', loadChildren: './pages/listing/detail/detail.module#DetailModule', pathMatch: 'full'},
  { path: 'ofertas/detalle', component: OfertaComponent, pathMatch: 'full', canActivate: [CanActiveViaAuthGuard]},
  { path: 'ofertas/detalle/estado', component: StateComponent },
  { path: 'mis-datos', component: DataComponent, pathMatch: 'full' },
  { path: 'pedidos', loadChildren: './pages/request/request.module#RequestModule', pathMatch: 'full', canActivate: [CanActiveViaAuthGuard] },
  { path: 'blog', component: HomeBlogComponent, pathMatch: 'full' },
  { path: 'producto', loadChildren: './shared/product/product.module#ProductModule', pathMatch: 'full' },
  { path: 'error', component: ErrorPageComponent, pathMatch: 'full' },
  { path: 'credit-card', component: CreditCardComponent, pathMatch: 'full', canActivate: [CanActiveViaAuthGuard] },
  { path: 'campaign/estado', component: LandingConfirmComponent, pathMatch: 'full', canActivate: [CanActiveViaAuthGuard] },
  { path: 'campaign', loadChildren: './pages/campaign/layout/layout.module#LayoutModule', pathMatch: 'full', canActivate: [CanActiveViaAuthGuard] },
  { path: 'financial-info', component : FinancialInfoComponent, pathMatch: 'full',canActivate: [CanActiveViaIncomeInfo] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    onSameUrlNavigation: 'reload',
    enableTracing: false
    // useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
