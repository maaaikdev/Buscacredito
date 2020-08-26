import { Component, OnInit, Input } from '@angular/core';
import { SimularService } from '../../../core/services/simular.service';
import { SesionService } from '../../../core/services/sesion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrokerService } from '@app/core/services/broker.service';
import { environment } from 'environments/environment';
import { ModalService } from '@app/core/services/modal.service';

declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  ofertaInfo: any;
  id: any;
  loading: boolean;
  aprove: boolean;
  radicad: string;
  radicado: any;
  expireDate: number;
  personalData: any;
  date: any;
  urlApply: any;
  stateUser: any;
  sso: any;
  cuestionariOTP: any;

  constructor(
    public modal: ModalService,
    public simular: SimularService,
    public sesion: SesionService,
    private route: ActivatedRoute,
    public broker: BrokerService,
    private router: Router,
    public activatedRoute: ActivatedRoute) {
    const data = this.simular.getStorage();
    this.personalData = data;
    this.sesion.loggedIn = localStorage.getItem('loggedIn');
    const d = new Date();
    this.date = d.getDate();
    this.activatedRoute.queryParams.subscribe((params): any => {
      this.sso = params.sso;
      this.id = params.id;
    });
  }

  ngOnInit() {
    let offers = localStorage.getItem('offers');
    offers = JSON.parse(offers);
    this.getOffer(offers);
    if (this.ofertaInfo.flag === 1) {
      // console.log('oferta ya aplico', this.oferta);
      // this.router.navigate(['ofertas/detalle/estado/' + this.ofertaInfo.id]);
      // this.aprove = true;
      // this.radicad = localStorage.getItem('radicado');
    }
    // this.validateCustomer();
    this.validateOTP();
  }

  getOffer(offers) {
    this.ofertaInfo = offers.filter(c => c.id === this.id);
    console.log('oferta info iddd', this.ofertaInfo[0]);
    this.ofertaInfo = this.ofertaInfo[0];
    this.ofertaInfo.expire = Date.now();
    this.ofertaInfo.benefits = JSON.parse(this.ofertaInfo.benefits);
  }
  validateOTP() {
    // validar si ya hizo el evidente
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    $('#process-modal').modal('show');
    this.broker.validateOTP_customer().subscribe((resp: any) => {
      $('#process-modal').modal('hide');
      if (resp.resultado === '1') {
        this.stateUser = resp.resultado;
      } else {
        this.stateUser = "0";
        this.urlApply = environment.urlOTP + '&id=' + this.id;
      }
    }, error => {
      this.router.navigate(['error']);
      $('#process-modal').modal('hide');
      console.log('error evidente usuario', error);
    });
    // this.broker.validateCustomer().subscribe( (resp: any) => {
    //   // console.log('res evidente usuario', resp);
    //   $('#process-modal').modal('hide');
    //   this.stateUser = resp.resultado;
    //   this.validateState(resp.resultado);
    //   if (resp.status_code == 500) {
    //     this.router.navigate(['error']);
    //     $('#process-modal').modal('hide');
    //   }
    // }, (error) => {
    //   this.router.navigate(['error']);
    //   $('#process-modal').modal('hide');
    //   // console.log('error evidente usuario', error);
    // });
  }
  validateCustomer() {
    // validar si ya hizo el evidente
    $('#process-modal').modal('show');
    this.broker.validateCustomer().subscribe((resp: any) => {      
      $('#process-modal').modal('hide');
      this.stateUser = resp.resultado;
      this.validateState(resp.resultado);
      if (resp.status_code == 500) {
        this.router.navigate(['error']);
        $('#process-modal').modal('hide');
      }
    }, (error) => {
      this.router.navigate(['error']);
      $('#process-modal').modal('hide');
      // console.log('error evidente usuario', error);
    });
  }
  validateState(state) {
    if (this.sso) {
      const param = this.activatedRoute.snapshot.paramMap.get('id');
      // validacion sin parametro url del sso
      if (state === '01') {
        // no ha hecho el evidente
        // https://okta-ui-dev-co-sla-datacash.apps.appcanvas.net/seguridad?product=bc&id=1
        this.urlApply = environment.urlSeguridad + '&id=' + param;
      }
      // ya hizo el evidente y viene del sso aplicar automaticamente a la oferta
      if (state === '2') {
        // ya hizo el evidente
        const _this = this;
        setTimeout(function () {
          _this.applyOffer(_this.ofertaInfo);
        }, 200);
      }
    }
    else {
      const param = this.activatedRoute.snapshot.paramMap.get('id');
      // validacion sin parametro url del sso
      if (state === '01') {
        // no ha hecho el evidente
        this.urlApply = environment.urlSeguridad + '&id=' + param;
      }
      // if ( state === '2') {
      //   // ya hizo el evidente y lo paso
      //   this.applyOffer(this.ofertaInfo);
      // }
    }
    if (state === '09') {
      // ya hizo el evidente  supero número de intentos modal de aviso
    }
  }
  applyOffer(data) {
    // $('#process-modal').modal('show');
    $('#process-modal').modal({
      show: true,
      keyboard: false
    });
    this.aprove = true;
    delete data.benefits;
    this.broker.aplicar_oferta(data).subscribe((res: any) => {
      console.log('res aplicar oferta', res);
      this.radicad = res.radicado;
      this.sesion.radicado = res;
      // this.router.navigate(['ofertas/detalle/estado']);
      // localStorage.setItem('radicado', JSON.stringify(res));
      // this.router.navigate(['ofertas/detalle/estado/', { rad: this.radicad  }]);
      this.router.navigate(['ofertas/detalle/estado/'], { queryParams: { rad: this.radicad, id: this.id } });
      $('#process-modal').modal('hide');
      // this.modal.open(JSON.stringify(res));
      this.modal.open(res, this.ofertaInfo);
    }, error => {
      this.router.navigate(['error']);
      $('#process-modal').modal('hide');
    });
  }
  test() {
    $('#formTest').submit();
  }
}
//   applyOffer(data){
//     $('#process-modal').modal('show');
//     // console.log('applioffer', data);
//     // this.aprove = true;
//     // // this.router.navigate(['ofertas/detalle/estado']);
//     // this.router.navigate(['ofertas/detalle/estado/' + data.id]);
//     // const body = this.simular.validacionInicial();
//     delete data.benefits;
//     this.broker.aplicar_oferta(data).subscribe( (res: any) => {
//       // console.log('res aplicar oferta', res);
//       // localStorage.setItem('radicado', JSON.stringify(res.radicado));
//       this.radicad = res.radicado;ñ
//       this.router.navigate(['ofertas/detalle/estado/', { queryParams: { rad: this.radicad }]);
//       // this.router.navigate(['ofertas/detalle/estado/', { rad: this.radicad  }]);
//       $('#process-modal').modal('hide');
//       $('#modal-confirm').modal('show');
//     }, error => {
//       this.router.navigate(['error']);
//       $('#process-modal').modal('hide');
//       // console.log('error aplicar oferta', error);
//     });
//   }
// }
