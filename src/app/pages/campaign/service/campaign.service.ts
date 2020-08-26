import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

const headers: any = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
  campaignInfo: {
    entity: "",
    companyNit: "",
    expiredDate: any,
    productName: any,
    templateParams: any
  };
  orderNumber: any;
  orderDate: any;
  idNumber: any;
  urlCampaign: any;
  urlRedirectMethod: any;
  email: any;
  hasApply: any;

  constructor(
    public http: HttpClient    
  ) { }

  getCampaignInfo(data) {
    const body = JSON.stringify(data);
    //return this.http.post("http://localhost:8080" + '/ecs/datacash/bank/v1/campaigninfo', body, { headers });
    return this.http.post(environment.APIEndpoint_bank + '/ecs/datacash/bank/v1/campaigninfo', data, { headers });
  }

  getCustomerCampaign(data) {
    const body = JSON.stringify(data);
    //return this.http.post("http://localhost:8080" + '/ecs/datacash/bank/v1/customercampaigninfo', body, { headers });
    return this.http.post(environment.APIEndpoint_bank + '/ecs/datacash/bank/v1/customercampaigninfo', data, { headers });
  }

  applyCampaign(data) {
    const body = JSON.stringify(data);
    //return this.http.post("http://localhost:8080" + '/ecs/datacash/bank/v1/campaign', body, { headers });
    return this.http.post(environment.APIEndpoint_bank + '/ecs/datacash/bank/v1/campaign', body, { headers });
  }

}