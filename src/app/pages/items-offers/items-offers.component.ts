import { Component, OnInit, Input } from '@angular/core';
import { BrokerService } from '@app/core/services/broker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-offers',
  templateUrl: './items-offers.component.html',
  styleUrls: ['./items-offers.component.scss']
})
export class ItemsOffersComponent implements OnInit {

  @Input() data: any;
  constructor(private brokerService: BrokerService, private router: Router) { }

  ngOnInit() {
  }

  irOferta() {
    if (this.data.url != undefined) {
      if (this.data.url != "") {
        window.location.href = this.data.url;
        return;
      }
    }
    if (this.data.dataOffer != undefined) {
      this.brokerService.ofertSelected = this.data.dataOffer;
      this.router.navigate(['/ofertas/detalle'], { queryParams: { companyId: this.data.dataOffer.companyId, offerId: this.data.dataOffer.id } });
      // this.router.navigateByUrl('detail?companyId=' + this.data.comapny + "&offerId=" + this.data.dataOffer.id);
    }
  }

}
