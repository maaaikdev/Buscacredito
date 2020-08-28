import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';
import { StepsComponent } from './pages/home/steps/steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { registerLocaleData } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { CanActiveViaAuthGuard } from './core/services/auth-guard.service';
import { SubmenuComponent } from './shared/submenu/submenu.component';
import { DataComponent } from './pages/data/data.component';
import { CurrencyFormat } from './core/pipes/currencyFormat.pipe';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeBlogComponent } from './pages/blog/home-blog/home-blog.component';
import { StateComponent } from './pages/listing/state/state.component';
import { IntroComponent } from './pages/home/intro/intro.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { CreditCardComponent } from './pages/campaign/credit-card/credit-card.component';
import { HeaderModule } from './shared/header/header.module';
import { LoadingModule } from './shared/loading/loading.module';
import { LandingConfirmComponent } from './pages/campaign/landing-confirm/landing-confirm.component';
import { FinancialInfoComponent } from './pages/financial-info/financial-info.component';
import { CanActiveViaIncomeInfo } from './core/services/income-info.service';
import { ItemsOffersComponent } from './pages/items-offers/items-offers.component';
import { NewOffersComponent } from './pages/new-offers/new-offers.component';
registerLocaleData(localeEs, 'es');

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: false,
  decimal: ".",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SimulatorComponent,
    StepsComponent,
    SubmenuComponent,
    DataComponent,
    CurrencyFormat,
    ErrorPageComponent,
    BreadcrumbComponent,
    HomeBlogComponent,
    StateComponent,
    IntroComponent,
    LandingConfirmComponent,
    CreditCardComponent,
    FinancialInfoComponent,
    ItemsOffersComponent,
    NewOffersComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    HeaderModule,
    LoadingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CanActiveViaAuthGuard,
    CanActiveViaIncomeInfo,
    CookieService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  // {provide: ErrorHandler, useClass : ErrorHandlerService}
  bootstrap: [AppComponent]
})
export class AppModule { }
