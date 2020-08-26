import { Component, OnInit } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { ActivatedRoute } from '@angular/router';
import { SimularService } from '@app/core/services/simular.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  ofertaInfo: any;
  loading: boolean;
  aprove: boolean;
  radicad: string;
  expireDate: number;
  personalData: any;
  date: any;
  urlApply: any;
  stateUser: any;
  sso: any;
  id: any;
  constructor(
    public broker: BrokerService,
    public activatedRoute: ActivatedRoute,
    public simular: SimularService) {
    const data = this.simular.getStorage();
    this.personalData = data;
    this.activatedRoute.queryParams.subscribe( (params): any => {
      this.radicad = params.rad;
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.aprove = true;
    let offers = localStorage.getItem('offers');
    offers = JSON.parse(offers);
    this.getOffer(offers);
    // console.log('ofertainffff', this.ofertaInfo);
    if (this.ofertaInfo.flag === 1) {
      // console.log('oferta ya aplico');
      // this.router.navigate(['ofertas/detalle/estado/' + this.ofertaInfo.id]);
      // this.aprove = true;
      // this.radicad = localStorage.getItem('radicado');
    }
    this.validateCustomer();
  }
  getOffer(offers){
    this.ofertaInfo =  offers.filter( c => c.id === this.id);
    this.ofertaInfo = this.ofertaInfo[0];
    this.ofertaInfo.expire = Date.now();
    // this.ofertaInfo.benefits = JSON.parse(this.ofertaInfo.benefits);
  }
  validateCustomer() {
    // validar si ya hizo el evidente
    this.broker.validateCustomer().subscribe( (resp: any) => {
      // console.log('res evidente usuario', resp);
      this.stateUser = resp.resultado;
    }, (error) => {
        // console.log('error evidente usuario', error);
    });
  }
}
