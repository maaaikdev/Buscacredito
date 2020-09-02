import { Component, OnInit } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionService } from '@app/core/services/sesion.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {
  dataOferta: any;
  urlLegalTerms: any;
  urlPrivacyPolicy: any;
  hasApply: any;
  terms = false;

  constructor(
    public broker: BrokerService, 
    private activateRoute: ActivatedRoute, 
    public sesion: SesionService,
    private router: Router) {
    console.log("Oferta ---> ", this.broker.ofertSelected);
    if (this.broker.ofertSelected == undefined) {
      this.activateRoute.queryParams.subscribe( (params): any => {
        this.dataOferta = {
          idSession: this.sesion.sesionCookie, 
          companyId: params.companyId,
          offerId: params.offerId
        }
      });
      
      this.broker.consultarDetalle(this.dataOferta).subscribe((resultado: any) => {
        console.log("entrooooo");
        this.broker.ofertSelected = resultado;
      }, error => {
         //this.router.navigate(['/']);
      });      
    }
  }

  ngOnInit() {
  }

  applyDetailOffer(){    
    this.router.navigate(['/ofertas/detalle/estado'],{queryParams : {companyId : this.broker.ofertSelected.company.id, offerId : this.broker.ofertSelected.id}});
  }

}
