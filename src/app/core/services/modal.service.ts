import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  resApi: any;
  resRad: any;
  radUrl: any;
  radParam: any;
  offerInfo: any;

  constructor() { 
  }

  close() {
    this.resApi = '';
    $('#modal-confirm').modal('toggle');
  }

  open(resApi, ofertaInfo) {
    this.resApi = resApi;
    this.resRad = resApi.radicado;
    this.radUrl = resApi.productUrl;
    this.radParam = resApi.paramsUrl;
    this.offerInfo = ofertaInfo;
    console.log('resModal', this.offerInfo);
    // console.log('resModal', this.radUrl);
    // console.log('resModal', this.radParam);
    // $('#modal-confirm').modal('show');
    $('#modal-confirm').modal({
      show: true,
      keyboard: false
    });
  }
}

