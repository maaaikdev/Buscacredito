import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrokerService } from '@app/core/services/broker.service';
import { LoadService } from '@app/core/services/load.service';
import { CampaignService } from '../service/campaign.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  params: any;
  imgN: any;
  msgCaptcha: any;
  invalidCaptcha: any;
  campaignData: any;
  urlLegalTerms: any;
  urlPrivacyPolicy: any;
  hasApply: any;
  loaded = false;
  terms = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public br: BrokerService,
    public campaign: CampaignService,
    public load: LoadService
  ) { }

  ngOnInit() {
    this.invalidCaptcha = false;
  }

}
