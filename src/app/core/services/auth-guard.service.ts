import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SesionService } from './sesion.service';
import { BrokerService } from './broker.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SimularService } from './simular.service';

@Injectable()
export class CanActiveViaAuthGuard implements CanActivate {
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
    this.sesion.path = page;
    if ((page === 'campaign,bosi' || page === 'campaign') && !this.sesion.sesionCookie) {
      return true;
    }
    if (page === 'campaign,estado' && !this.sesion.sesionCookie) {
      return true;
    }
    if (page === 'credit-card' && !this.sesion.sesionCookie) {
      return true;
    }

    if (!this.sesion.sesionCookie
      && (page === 'error'
        || page === 'ofertas'
        || page === 'pedidos'
        || page === 'mis-datos'
        || page === 'ofertas/detalle/*'
        || page === 'ofertas/detalle/estado')) {
      this.router.navigate(['/']);
      return false;
    }

    if (page === 'ofertas/detalle/estado') {
      this.router.navigate(['/ofertas/detalle/*']);
      this.validateSession();
      return false;
    }
    if (page === '' && this.sesion.sesionCookie) {
      this.validateSession();
      if (this.infoComplete) {
        this.router.navigate(['/ofertas']);
        return false;
      }
    }
    return true;
  }
  validateSession() {
    const cookie = this.cookieservice.get('IDSESSIONMDC');
    const data = {
      clientId: environment.clientId,
      idSession: this.cookieservice.get('IDSESSIONMDC'),
      country: environment.country
    };

    this.broker.validar_sesion(data).subscribe((response: any) => {
      this.sesion.sesionCookie = this.cookieservice.get('IDSESSIONMDC');
    },
      error => {
        this.broker.cerrar_sesion(data).subscribe((response: any) => {
        }, error => {
        });
        setTimeout(() => {
          this.cookieservice.delete('IDSESSIONMDC');
          this.cookieservice.delete('IDSESSIONMDC', cookie, environment.domain);
          this.router.navigate(['/']);
          this.sesion.sesionCookie = null;
        }, 200);
      }
    );
  }
}
