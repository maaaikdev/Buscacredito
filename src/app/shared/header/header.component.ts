import { Component, OnInit, HostListener } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SesionService } from '../../core/services/sesion.service';
import { CookieService } from 'ngx-cookie-service';
import { BrokerService } from '@app/core/services/broker.service';
import { environment } from 'environments/environment';
import { SimularService } from '@app/core/services/simular.service';
import { LocationService } from '@app/core/services/location.service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  url: any;
  scroll = false;
  initial = false;
  nameSesion: any;
  txt: any;
  loginUrl: string;
  regUrl: any;
  validateSesion: any;
  obtenerInfo: any;
  city: any;
  dataLogHea: any;

  constructor(
    private location: LocationService,
    private router: Router,
    public sesion: SesionService,
    private cookieService: CookieService,
    private broker: BrokerService,
    private activatedRoute: ActivatedRoute,
    private simular: SimularService) {

      this.activatedRoute.queryParams.subscribe((params): any => {
        this.dataLogHea = {
          logo: params.log
        }
        console.log("Logo", this.dataLogHea)
      });

    this.loginUrl = environment.urlLogin;
    this.regUrl = environment.urlRegister;
    this.nameSesion = this.simular.getStorage();

    // if (!this.sesion.sesionCookie) {
    //   $('#modal-info').modal('hide');
    // }
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = val.url;
        console.log("Url", this.url || this.url === '/ofertas/detalle/estado')
        if (val.url === '/') {
          this.initial = false;
        }
        else {
          this.initial = true;
        }
        this.nameSesion = this.simular.getStorage();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.url === '/' || this.url === '/ofertas/detalle/estado') {
      // if (!this.sesion.sesionCookie) {
      //   $('#modal-info').modal('hide');
      // }
      if (window.pageYOffset !== 0) {
        this.scroll = true;
      } else {
        this.scroll = false;
      }
    }
  }

  toggleClass() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
  }

  cerrarSesion() {
    debugger;
    const body = {
      clientId: environment.clientId,
      idSession: this.sesion.sesionCookie,
      country: environment.country
    };
    this.broker.cerrar_sesion(body).subscribe((response: any) => {
      this.borrarData();
    },
    (error) => {
      this.borrarData();
    });
  }

  borrarData() {
    window.localStorage.clear();
    this.cookieService.delete('IDSESSIONMDC', this.sesion.sesionCookie, environment.domain);
    this.sesion.sesionCookie = null;
    this.router.navigate(['/']);
    $('#modal-info').modal('hide');
  }
}