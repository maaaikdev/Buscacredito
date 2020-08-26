import { Component, OnInit } from '@angular/core';
import { SesionService } from '@app/core/services/sesion.service';
declare var $: any;
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  sesionC: any;
  constructor(private sesion: SesionService) { 
    this.sesionC = this.sesion.sesionCookie;
  }

  ngOnInit() {
    $('#process-modal').modal('hide');
    // console.log('router', this.router.url);
  }
}
