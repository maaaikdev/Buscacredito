import { Component, OnInit } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { SimularService } from '@app/core/services/simular.service';
declare var $: any;
@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  public offers = [];
  public offersFil = [];
  public viewNoOffer = false;

  public numOffers = 0

  public nameSesion: any;

  constructor(private brokerService: BrokerService, private simular: SimularService) {
    this.nameSesion = this.simular.getStorage();
  }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    $('#load-modal').modal('show');
    this.brokerService.getOffersByID().subscribe(
      result => {
        if(result.status == undefined){
          // this.offers = result;
          // this.offersFil = this.offers;
          result.forEach(companys => {
            companys.offers.forEach(offerCompany => {
              var offerAux = { company: "", productName: "", image: "", description1: "", value1: "", description2: "", value2: "", timeOffer: "", url: "", type:"", dataOffer : {}, dataCompanyId : ""};
              offerAux.company = companys.company.name;
              offerAux.productName = offerCompany.card.productName;
              offerAux.image = companys.company.entityimg;
              offerAux.description1 = offerCompany.card.offerValueTitle;
              offerAux.value1 = offerCompany.card.offerValue;
              offerAux.description2 = offerCompany.card.offerAproxValueTitle;
              offerAux.value2 = offerCompany.card.offerAproxValue;
              // offerAux.url = environment.APIEndpoint + 'ofertas/detalle?idCompany=' + companys.company.id + '&idOffer=' + offerCompany.id;
              offerAux.dataOffer = offerCompany;
              offerAux.dataOffer["companyId"] = companys.company.id;
              offerAux.dataOffer["companyName"] = companys.company.name;
              offerAux.dataOffer["companyImage"] = companys.company.entityimg;
              // offerAux.dataCompanyId = companys.company.id;
              offerAux.timeOffer = offerCompany.detail.box3.value;
              offerAux.type = offerCompany.card.type;
              this.offers.push(offerAux);
            });
          });
          this.offersFil = this.offers;
          this.numOffers = this.offersFil.length;

        }else{
          this.viewNoOffer = true;
        }
        setTimeout(()=>{
          $('#load-modal').modal('hide');
        },1000)
      }
    );
  }

  filterTypeOffer(filtro, ele) {
    if (!ele.target.classList.contains("active")) {
      for (let index = 0; index < ele.target.parentElement.children.length; index++) {
        const element = ele.target.parentElement.children[index];
        element.classList.remove("active");

      }
      ele.target.classList.add("active");
    }
    if (filtro == "todos") {
      this.offersFil = this.offers;
      // this.offers.forEach(companys => {
      //   this.numOffers = this.numOffers + companys.offers.length;
      // });
    } else {
      // this.offersFil = [];
      // let offersAux = this.offers;
      // offersAux.forEach(companys => {
      //   var auxCompany = companys;
      //   auxCompany.offers = companys.offers.filter((offerCom) => offerCom.detail.type == filtro );
      //   this.offersFil.push(auxCompany);
      //   this.numOffers = this.numOffers + auxCompany.offers.length;
      // });
      this.offersFil = this.offers.filter((ele) => ele.type == filtro);
    }
    this.numOffers = this.offersFil.length;
  }

}
