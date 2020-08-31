import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { content } from '../interface/content.interface';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';

const headers: any = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  public ofertSelected = {};

  constructor(
    public http: HttpClient,
    private cookieService: CookieService) { }

  validacion_inicial(data) {
    data.sessionId = this.cookieService.get('IDSESSIONMDC');
    const body = JSON.stringify(data);
    return this.http.post(environment.APIEndpoint_nwuser + '/new-user-ws/api/v1/user/validateUser', body, { headers });
  }

  actualizar_adicional(data) {
    data.sessionId = this.cookieService.get('IDSESSIONMDC');
    const body = JSON.stringify(data);
    return this.http.post(environment.APIEndpoint_nwuser + '/new-user-ws/api/v1/user/saveAditionalInfo', body, { headers });
  }

  obtener_informacion(data) {
    data.country = environment.country;
    const body = JSON.stringify(data);
    return this.http.post(environment.APIEndpoint_nwuser + '/new-user-ws/api/v1/user/obtainUser', body, { headers });
  }

  obtener_ofertas(data) {
    data.sessionId = this.cookieService.get('IDSESSIONMDC');
    const body = JSON.stringify(data);
    return this.http.post(environment.APIEndpoint_lstng + '/ecs/datacash/listing/v1/offers', body, { headers });
  }

  contenido_interface() {
    return this.http.get('assets/data/content.json');
  }

  aplicar_oferta(data) {
    data.sessionId = this.cookieService.get('IDSESSIONMDC');
    data.country = environment.country;
    const body = JSON.stringify(data);
    return this.http.post(environment.APIEndpoint_bank + '/ecs/datacash/bank/v1/order', body, { headers });
  }

  validar_sesion(body) {
    return this.http.post(environment.APIEndpoint_authn + '/authn/validateSession ', body, { headers });
  }

  cerrar_sesion(body) {
    return this.http.post(environment.APIEndpoint_authn + '/authn/signOff', body, { headers });
  }

  validateCustomer() {
    const body: String = this.cookieService.get('IDSESSIONMDC');
    return this.http.post(environment.EvidenteEP.validateCusto, body, { headers });
  }

  validateOTP_customer() {
    const body: String = this.cookieService.get('IDSESSIONMDC');

    return this.http.post(environment.EvidenteEP.validateOTPCusto, body, { headers });
  }

  historial_pedidos() {
    const body = JSON.stringify({
      idSession: this.cookieService.get('IDSESSIONMDC'),
      country: environment.country
    });
    return this.http.post(environment.APIEndpoint_bank + '/ecs/datacash/bank/v1/requesthistory', body, { headers });
  }

  setIngresos(ingresos): any {
    const body = JSON.stringify(
      {
        idSession: this.cookieService.get('IDSESSIONMDC'),
        monthlyIncome: ingresos,
        country: "CO"
      });
    return this.http.post(environment.APIEndpoint_nwuser + environment.updateProfile, body, { headers });
  }

  getIncomeInfo(): any {
    const body = JSON.stringify([
      {
        "product": "BUSCACREDITO",
        "params": [
          {
            "name": "IN_SESSION",
            "value": this.cookieService.get('IDSESSIONMDC')
          }
        ]
      }
    ]);
    return this.http.post(environment.APIEndpoint + 'ldnfosession/sessioninfo/ecs', body, { headers });
  }

  getOffersByID(): any{
    var body = {
      idSession : this.cookieService.get('IDSESSIONMDC')
    }
    return this.http.post(environment.APIEndpoint_bank + environment.offers, body, { headers });
  }
  
  getOffers() {
    // return this.http.get('assets/data/offer-list.json');
    return this.http.post(environment.APIEndpoint_bank + environment.offersListHome, { headers });
  }

}