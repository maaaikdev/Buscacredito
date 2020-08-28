import { Component, OnInit } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { SimularService } from '@app/core/services/simular.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  public offers = [];
  public offersFil = [];

  public numOffers = 0

  public nameSesion: any;

  constructor(private brokerService : BrokerService,private simular: SimularService) {
    this.nameSesion = this.simular.getStorage();
   }

  ngOnInit() {
    this.getOffers();
  }

  getOffers(){
    this.brokerService.getOffersByID().subscribe(
      result => {
        this.offers = result;
        this.offersFil = this.offers;
        // this.offers.forEach(companys => {
        //   this.numOffers = this.numOffers + companys.offers.length;
        // });
        this.numOffers = this.offers.length;
      }
    );
  }

  filterTypeOffer(filtro,ele){
    if(!ele.target.classList.contains("active")){
      for (let index = 0; index < ele.target.parentElement.children.length; index++) {
        const element = ele.target.parentElement.children[index];
        element.classList.remove("active");
        
      }
      ele.target.classList.add("active");
    }
    if(filtro == "todos"){
      this.offersFil = this.offers;
      // this.offers.forEach(companys => {
      //   this.numOffers = this.numOffers + companys.offers.length;
      // });
    }else{
      // this.offersFil = [];
      // let offersAux = this.offers;
      // offersAux.forEach(companys => {
      //   var auxCompany = companys;
      //   auxCompany.offers = companys.offers.filter((offerCom) => offerCom.detail.type == filtro );
      //   this.offersFil.push(auxCompany);
      //   this.numOffers = this.numOffers + auxCompany.offers.length;
      // });
      this.offersFil = this.offers.filter((ele)=> ele.offers[0].detail.type == filtro);
    }
      this.numOffers = this.offersFil.length;
  }

}
