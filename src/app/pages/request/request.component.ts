import { Component, OnInit } from '@angular/core';
import { RequestService } from '@app/core/services/request.service';
import { BrokerService } from '@app/core/services/broker.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  req: any;
  entitiesImg = [
    'DATAFAT',
    'LINERU',
    'PRESTAPLATA',
    'BANCOABC',
    'BANCOSUPERIOR',
    'FINANCIAL'
  ];
  constructor(public request: RequestService, public broker: BrokerService, public router: Router) { 
    // this.req = this.request;
  }
  ngOnInit() {
    $('#load-modal').modal({
      show: true,
      keyboard: false
    });
    this.requestHistory();
  }
  requestHistory() {
    this.broker.historial_pedidos().subscribe((resp: any) => {
      // console.log('respuesta historial de pedidos', resp);
      // dateTXAlly: null
      // dateTrans: "1567460405800"
      // fcoName: "LINERU"
      // numberTX: 740
      // productName: "Libre Inversion"
      // stateTX: "ESTUDIO"
      // totalOffer: 1000000
      // totalPaymentAprox: 1022300
      // totalQuotas: 1
      // valueQuotasAprox: 1022300
      // valueTXAlly: null
      // console.log('servicio request', resp);
      $('#load-modal').modal('hide');
      this.request.items = resp;
      setTimeout(() => {
        if(this.request.items) {
          this.cargarLogos();
        }
      }, 100);
    }, error =>{
      this.router.navigate(['error']);
      $('#load-modal').modal('hide');
    });
  }
  cargarLogos(){
    const entitiLogo = this.request.items.map(offer => {
      offer.imgN = 'otro';
      const nameEn = offer.fcoName.replace(/\s/g, '');
      // nameEn = nameEn.replace(/\b[A-Z]{2,}\b/g);
      // console.log('nameEn', nameEn);
      // return nameEn;
      this.entitiesImg.forEach(element => {
        // console.log(element)
        if(nameEn === element){
          // console.log('es igual', element)
          offer.imgN = offer.fcoName.replace(/\s/g, '');
          offer.imgN = offer.imgN.toLowerCase();
          // console.log('offer.imgN', offer.imgN);
        }
      });
    });
    // console.log('url img', this.urlImg);
    // console.log('url img', this.ofertasList);
  }

}
