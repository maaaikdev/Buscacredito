import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrokerService } from '@app/core/services/broker.service';
import { LoadService } from '@app/core/services/load.service';
import { CampaignService } from '../service/campaign.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';


declare var $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  params: any;
  imgN: any;
  box1: any;
  box2: any;
  box3: any;
  templateDetails: any;
  invalidCaptcha: any;
  recaptcha: string;
  campaignData: any;
  urlLegalTerms: any;
  urlPrivacyPolicy: any;
  hasApply: any;
  loaded = false;
  terms = false;
  tittle: any;
  subtittle: any;
  footprintHC: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public br: BrokerService,
    private router: Router,
    public campaign: CampaignService,
    public load: LoadService,
    private cookieService: CookieService) {
    this.activatedRoute.queryParams.subscribe((params): any => {
      this.params = params;
    });
  }

  changeCheck(event) {
    this.terms = !event.checked;
  }
  ngOnInit() {
    this.getCampaignData();
    this.invalidCaptcha = false;
  }
  captchaFn(captchaResponse: string) {
    this.invalidCaptcha = true;
    this.recaptcha = captchaResponse;
  }
  fnBtn(event: Event) {

  }

  getCampaignData() {

    if (this.cookieService.get('IDSESSIONMDC') === "" && this.params.utm_term === undefined) {
      var urlRedirect = environment.urlLogin + "&utm_campaign=" + this.params.utm_campaign;
      urlRedirect = this.params.log != undefined ? urlRedirect + "&log="+ this.params.log : urlRedirect;
      this.load.open('Para ver la campaña debes iniciar sesión', '', true, urlRedirect);
    }
    else {
      this.load.open('Estamos gestionando tu solicitud', '', false, undefined);
      var customerIdFixed = this.params.utm_term ? this.params.utm_term.split(" ").join("+") : "";
      const urlData = {
        campaignId: this.params.utm_campaign,
        customerId: customerIdFixed,
        sessionId: this.cookieService.get('IDSESSIONMDC')
      }
      this.campaign.getCampaignInfo(urlData).subscribe((response: any) => {
        this.loaded = true;
        this.campaign.campaignInfo = response.campaign;
        this.imgN = response.campaign.templateParams.entityimg;
        this.box1 = response.campaign.templateParams.box1;
        this.box2 = response.campaign.templateParams.box2;
        this.box3 = response.campaign.templateParams.box3;
        this.templateDetails = response.campaign.templateParams.details;
        this.footprintHC = (response.campaign.tasks && response.campaign.tasks.footprintHC) ? true : false;

        this.tittle = response.campaign.templateParams.tittle;
        this.subtittle = response.campaign.templateParams.subtittle;

        this.urlLegalTerms = response.businessProcess.termAndCondition.urlLegalTerms;
        this.urlPrivacyPolicy = response.businessProcess.termAndCondition.urlPrivacyPolicy;
        this.hasApply = response.customerCampaign.hasApply;

        setTimeout(() => {
          this.load.close();
        }, 1000);
      }, error => {
        this.load.open('Hubo un error obteniendo la información', '', true, '');
        this.load.redirectOnClose = '';
      });
    }
  }

  applyOffer() {
    if (this.cookieService.get('IDSESSIONMDC') === "" && this.params.utm_term === undefined) {
      var urlRedirect = environment.urlLogin + "&utm_campaign=" + this.params.utm_campaign;
      urlRedirect = this.params.log != undefined ? urlRedirect + "&log="+ this.params.log : urlRedirect;
      this.load.open('Para aplicar a la campaña debes iniciar sesión', '', true, urlRedirect);
    }
    else {
      this.invalidCaptcha = false;
      this.load.open('Estamos gestionando tu solicitud', '', false, undefined);
      const model = this;
      var customerIdFixed = this.params.utm_term ? this.params.utm_term.split(" ").join("+") : "";
      const urlData = {
        campaignId: this.params.utm_campaign,
        customerId: customerIdFixed,
        sessionId: this.cookieService.get('IDSESSIONMDC'),
        captcha: this.recaptcha
      };

      this.campaign.applyCampaign(urlData).subscribe((res: any) => {
        this.campaign.orderNumber = res.creditOrderId;
        this.campaign.orderDate = res.creditOrderDate;
        this.campaign.idNumber = res.idNumber;
        this.campaign.urlRedirectMethod = res.urlRedirectMethod;
        this.campaign.email = res.email;
        if (this.campaign.urlRedirectMethod === 'POST') {
          this.campaign.urlCampaign = res.urlCampaign + encodeURIComponent(res.idNumber);
        } else {
          this.campaign.urlCampaign = res.urlCampaign;
        }
        this.campaign.hasApply = true;
        model.load.close();
        this.cookieService.delete('IDSESSIONMDC');
        window.open(this.campaign.urlCampaign, '_blank');
        if (this.params.log) {          
          this.router.navigate(['campaign/estado'], { queryParams: { log: this.params.log, orderNumber: this.campaign.orderNumber } });
        }
        else {
          this.router.navigate(['campaign/estado'], { queryParams: { orderNumber: this.campaign.orderNumber } });
        }        

      }, error => {        
        this.load.open('Hubo un error procesando la solicitud', '', true, undefined);
      });
    }
  }
}