import { Injectable } from '@angular/core';
import { BrokerService } from './broker.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  items: any;
  constructor() {
    // this.broker.historial_pedidos().subscribe((resp: any) => {
    //   // console.log('respuesta historial de pedidos', resp);
    //   this.request = resp.RequestService;
    // });
  }
}