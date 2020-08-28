import { Injectable } from '@angular/core';
import { BrokerService } from './broker.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { content } from '../interface/content.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  loggedIn: string;
  datos = {} as content;
  sesionCookie: string;
  infoComplete: any;
  radicado: any;
  offers: any;
  path: any;

  constructor(private cookieService: CookieService, public broker: BrokerService) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.sesionCookie = this.cookieService.get('IDSESSIONMDC');
    this.offers = localStorage.getItem('offers');    

    //  this.sesionCookie = 'd38c77a0-3ebc-4dce-b18c-30981ea1a447';
    //  this.cookieService.set('IDSESSIONMDC', 'd38c77a0-3ebc-4dce-b18c-30981ea1a447'); 
  }

  withHeader(){
    if(window.location.href.includes("financial-info")){
      return false;
    }
    return true;
  }

}
