import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SesionService } from './sesion.service';
import { BrokerService } from './broker.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SimularService } from './simular.service';

@Injectable()
export class CanActiveViaIncomeInfo implements CanActivate {
  loggin: any;
  cookie: any;
  userData: any;
  infoComplete: any;
  constructor(
    private router: Router,
    public sesion: SesionService,
    public simular: SimularService,
    private broker: BrokerService,
    private cookieservice: CookieService) {
    this.infoComplete = this.sesion.infoComplete;
  }
  canActivate(route: ActivatedRouteSnapshot) {
    const page = route.url.toString();
    this.broker.getIncomeInfo().subscribe(
      result => {
        if(result[0].params[0].value != "true"){
          if(page === "financial-info" ){
            this.router.navigate(["/ofertas"]);
          }
          return true;
        }else{
          this.router.navigate(['/financial-info']);
        }
      }
    )
    return true;
  }
}
