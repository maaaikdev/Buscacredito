import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../service/campaign.service';
import { LoadService } from '@app/core/services/load.service';

@Component({
  selector: 'app-landing-confirm',
  templateUrl: './landing-confirm.component.html',
  styleUrls: ['./landing-confirm.component.scss']
})
export class LandingConfirmComponent implements OnInit {

  confirmInfo: {
    urlRedirect: string;
    entity: string;
    companyNit: string;
    productName: string;
    email: string;
    orderNumber: string;
    orderDate: string;
    templateParams: {
      gifConfirm: string;
      applyBenefits: [];
      contactInfo: {
        phone: string;
        schedule: string;
        email: string;
      },
      terms: string;
    };
  }
  params: any;

  constructor(public activatedRoute: ActivatedRoute, private router: Router,
    public load: LoadService, public campaign: CampaignService) {
    this.activatedRoute.queryParams.subscribe((params): any => {
      this.params = params;
    });
    this.confirmInfo = {
      urlRedirect: "",
      entity: "",
      companyNit: "",
      productName: "",
      email: "",
      orderNumber: "",
      orderDate: "",
      templateParams: {
        gifConfirm: "",
        applyBenefits: [],
        contactInfo: {
          phone: "",
          schedule: "",
          email: "",
        },
        terms: "",
      }
    }
  }

  ngOnInit() {
    if (this.params.orderNumber === undefined) {
      this.load.open('Hubo un error obteniendo la información', '', true, '');
    }
    else {
      if (this.campaign.hasApply) {
        this.setConfirmInfo(this.campaign.campaignInfo);
        this.confirmInfo.orderDate = this.campaign.orderDate;
        this.confirmInfo.urlRedirect = this.campaign.urlCampaign;
        this.confirmInfo.email = this.campaign.email;
      }
      else {
        this.load.open('Estamos gestionando tu solicitud', '', false, undefined);
        const urlData = {
          orderId: this.params.orderNumber
        }
        this.campaign.getCustomerCampaign(urlData).subscribe((response: any) => {
          let urlRedirect = response.campaign.urlRedirect;
          if (response.campaign.urlRedirectMethod === 'POST') {
            urlRedirect = response.campaign.urlRedirect + encodeURIComponent(response.idNumber);
          }

          this.setConfirmInfo(response.campaign);
          this.confirmInfo.urlRedirect = urlRedirect;
          this.confirmInfo.email = response.email;
          this.confirmInfo.orderDate = response.creditOrderDate;
          setTimeout(() => {
            this.load.close();
          }, 1000);

        }, error => {
          this.load.open('Hubo un error obteniendo la información', '', true, '');
          this.load.redirectOnClose = '';
        });
      }
    }
  }

  setConfirmInfo(data) {
    this.confirmInfo.companyNit = data.companyNit;
    this.confirmInfo.entity = data.entity;
    this.confirmInfo.productName = data.productName;
    this.confirmInfo.templateParams.gifConfirm = data.templateParams.gifConfirm;
    this.confirmInfo.templateParams.applyBenefits = data.templateParams.applyBenefits;
    this.confirmInfo.templateParams.contactInfo = data.templateParams.contactInfo;
    this.confirmInfo.templateParams.terms = data.templateParams.terms;
    this.confirmInfo.orderNumber = this.params.orderNumber;
  }

  confirm() {
    window.open(this.confirmInfo.urlRedirect, '_blank');
  }

}
