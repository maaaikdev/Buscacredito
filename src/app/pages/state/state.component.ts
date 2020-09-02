import { Component, OnInit } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SimularService } from '@app/core/services/simular.service';
import { SesionService } from '@app/core/services/sesion.service';

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

  //NEW
  confirmOffer: any;
  company: any;
  applyDetail: any;
  detailBullets: any;
  ContactInfo: any;
  printOffer: any;

  constructor(
    public broker: BrokerService,
    public activateRoute: ActivatedRoute,
    public simular: SimularService,
    public sesion: SesionService,
    private router: Router) {
    // const data = this.simular.getStorage();
    // this.personalData = data;
    // this.activatedRoute.queryParams.subscribe( (params): any => {
    //   this.radicad = params.rad;
    //   this.id = params.id;
    // });

    if (this.broker.ofertSelected == undefined) {
      this.activateRoute.queryParams.subscribe( (params): any => {
        this.printOffer = {
          idSession: this.sesion.sesionCookie, 
          companyId: params.companyId,
          offerId: params.offerId
        }
      });
      this.broker.applyOffer().subscribe( (result) => { 
        this.confirmOffer = result;
        this.company = this.confirmOffer.company;
        this.applyDetail = this.confirmOffer.applyDetail
        this.detailBullets = this.applyDetail.applyBenefits
        this.ContactInfo = this.applyDetail.contactInfo
      }, error => {
         this.router.navigate(['/']);
      });      
    }

    this.getOfferDetail()
  }
 
  ngOnInit() {
    /*
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
    this.validateCustomer();¨*/
  }
   /*
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
  }*/
  getOfferDetail(){
     this.broker.applyOffer().subscribe( (result) => { 
       this.confirmOffer = result;
       this.company = this.confirmOffer.company;
       this.applyDetail = this.confirmOffer.applyDetail
       this.detailBullets = this.applyDetail.applyBenefits
       this.ContactInfo = this.applyDetail.contactInfo
       console.log("Oferta de detalle",this.confirmOffer )
       console.log("Compañia",this.company )
       console.log("Aplicar Detalle",this.detailBullets )
     });
  }
}
