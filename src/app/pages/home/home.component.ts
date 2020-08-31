import { Component, OnInit, HostListener } from '@angular/core';
import { SesionService } from '@app/core/services/sesion.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BrokerService } from '@app/core/services/broker.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category = [
    {
      id: 1,
      title: "Ofertas de crédito",
      button: "Solicitar",
      icon: "assets/images/home/ico-cat-ofertaDeCredito.svg"
    },
    {
      id: 2,
      title: "Ofertas de inversión",
      button: "Solicitar",
      icon: "assets/images/home/ico-cat-Inversion.svg"
    },
    {
      id: 3,
      title: "Reparadores de deuda",
      button: "Solicitar",
      icon: "assets/images/home/ico-cat-ReparaDeuda.svg"
    },
    {
      id: 4,
      title: "Otras ofertas disponibles",
      button: "Solicitar",
      icon: "assets/images/home/ico-cat-Otras.svg"
    },
  ]
  offersList = [];
  loginUrl: any;  
  
  // isMenuOpen: Boolean = false;
  constructor(
    public sesion: SesionService, 
    public router: Router,
    public broker: BrokerService) { 
    this.loginUrl = environment.urlLogin;
    this.getOfferHome()  
  }
  ngOnInit() {
    if (this.sesion.sesionCookie) {
      this.router.navigate(['/ofertas']);
    }
  }

  // getOfferHome(){
  //   this.broker.getOffers().subscribe( (result: any) => {
  //     this.offersList = result;
  //     console.log("Listado Ofertas Biscacrédito", this.offersList)
  //   },error => {      

  //   })
  // }

  getOfferHome(){
    this.broker.getOffers().subscribe((result:any) => {
        result.forEach(companys => {
          console.log("Companys", companys)
          companys.offers.forEach(offerCompany => {
            var offerAux = { company: "", productName: "", image: "", description1: "", value1: "", description2: "", value2: "", timeOffer: "", url: "", type:"" };
            offerAux.company = companys.company.name;
            offerAux.productName = offerCompany.card.productName;
            offerAux.image = companys.company.entityimg;
            offerAux.description1 = offerCompany.card.offerValueTitle;
            offerAux.value1 = offerCompany.card.offerValue;
            offerAux.description2 = offerCompany.card.offerAproxValueTitle;
            offerAux.value2 = offerCompany.card.offerAproxValue;
            // offerAux.url = environment.urlLogin;
            offerAux.url = environment.urlLogin + 'ofertas/detalle?idCompany=' + companys.company.id + '&idOffer=' + offerCompany.id;  
            offerAux.type = offerCompany.card.type;
            this.offersList.push(offerAux);
          });
        });        
      }
    );
  }

  whiteAdd(){
    $('.hover-1-description').addClass('text-white')
    $('.imgIcon').addClass('filter-white')
  }
  whiteRemove(){
    $('.hover-1-description').removeClass('text-white')
    $('.imgIcon').removeClass('filter-white')
  }

}
