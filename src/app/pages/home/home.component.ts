import { Component, OnInit, HostListener } from '@angular/core';
import { SesionService } from '@app/core/services/sesion.service';
import { Router } from '@angular/router';
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
  offersList:any;
  
  // isMenuOpen: Boolean = false;
  constructor(
    public sesion: SesionService, 
    public router: Router,
    public broker: BrokerService) { 
    // console.log(this.sesion.infoComplete);
    // console.log("Array", this.category);
    this.getOfferHome()
  }
  ngOnInit() {
    // console.log('empieza home', this.router.url);
    if(!this.sesion.sesionCookie){
      // console.log('no tiene sesion cookie',this.sesion.sesionCookie);
      $('#modal-intro').modal('show');
    }
  }

  getOfferHome(){
    this.broker.getOffers().subscribe( (result: any) => {
      this.offersList = result;
      console.log("Listado Ofertas Biscacrédito", this.offersList)
    },error => {      

    })
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
