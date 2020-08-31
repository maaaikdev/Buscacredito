import { Component, OnInit, Input } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-offers',
  templateUrl: './items-offers.component.html',
  styleUrls: ['./items-offers.component.scss']
})
export class ItemsOffersComponent implements OnInit {

  loginUrl: string;

  @Input() data: any;
  constructor(private brokerService: BrokerService, private router: Router) { }

  ngOnInit() {
  }

  irOferta() {
    debugger;
    if (this.data.url != undefined && this.data.url != "") {
      window.location.href = this.data.url;
      return;
    }
    if (this.data.dataOffer) {
      this.brokerService.ofertSelected = this.data.dataOffer;
      this.router.navigate(['/ofertas/detalle'],{queryParams : {companyId : this.data.dataCompanyId, offerId : this.data.dataOffer.id}});
      // this.router.navigateByUrl('detail?companyId=' + this.data.comapny + "&offerId=" + this.data.dataOffer.id);
    }
  }

}
