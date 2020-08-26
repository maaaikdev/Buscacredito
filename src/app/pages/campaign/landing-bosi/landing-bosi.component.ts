import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../service/campaign.service';
import { LoadService } from '@app/core/services/load.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-bosi',
  templateUrl: './landing-bosi.component.html',
  styleUrls: ['./landing-bosi.component.scss']
})
export class LandingBosiComponent implements OnInit {


  params: any;
  nombre: any;
  documento: any;
  loaded: boolean;
  validCaptcha: boolean;

  data: any;

  constructor(private campaign: CampaignService, private load: LoadService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe((params): any => {
      this.params = params;
    });

    this.loaded = false;
    this.validCaptcha= false;
    this.data = { captcha: null, customerId: null, campaignId: null }

  }

  ngOnInit() {
    //console.log(this.nombre)
  }

  captchaFn(token) {
    if (this.params.utm_campaign == null || this.params.utm_term == null) {
      this.load.open('URL Error!', 'La información de la campaña esta incompleta!', false, undefined);
      this.validCaptcha = false;
      return;
    }
    this.data.captcha = token;
    this.validCaptcha = true;
  }

  applyCampaign() {
    this.load.open('Por favor espera un momento!', 'Estamos validando la información!', false, undefined);
    
    this.data.customerId = this.params.utm_term;
    this.data.campaignId = this.params.utm_campaign;

    this.campaign.applyCampaign(this.data).subscribe((response: any) => {
      this.loaded = true;
      this.load.close();
      this.nombre = response.userData.name;
      this.documento = response.userData.document;
      //console.log(JSON.stringify(response));
    }, error => {
      this.validCaptcha = false;
      this.loaded = false;
      this.load.open('Error!', 'Se produjo un error al intentar aplicar a la campaña!', true, '');
      grecaptcha.reset();

    })

  }

}
