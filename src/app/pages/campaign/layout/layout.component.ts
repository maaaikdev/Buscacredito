import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  type: any;

  params: any;

  constructor(private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe((params): any => {
      this.params = params;
    });


    switch (this.params.utm_campaign) {
      case 'bosi_buscacredito':
        this.type = 'bosi';
        break;
      default:
        this.type = 'campaña1'
    }
  }

  ngOnInit() {
  }

}
