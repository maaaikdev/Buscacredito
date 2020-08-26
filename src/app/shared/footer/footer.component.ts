import { Component, OnInit } from '@angular/core';
import { SesionService } from '@app/core/services/sesion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  dataLogFoo: any;

  constructor(
    public sesion: SesionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params): any => {
      this.dataLogFoo = {
        logo: params.log
      }
    });
  }

  ngOnInit() {

  }
}