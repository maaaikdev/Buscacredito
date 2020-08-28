import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BrokerService } from './core/services/broker.service';
import { content } from './core/interface/content.interface';
import { SesionService } from './core/services/sesion.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  env = environment;
  title = 'buscacredito';
  txt: any;
  public innerWidth: any;
  public isMobile: any = false;
  public isTablet: any = false;
  public isMedium: any = false;
  public isDesktop: any = false;
  constructor(private router: Router, private broker: BrokerService, public sesion: SesionService) {

    if (environment.gtmPruebas) {
      const script = document.createElement('script');
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5H395HG');`;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5H395HG"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    } else {

      const script = document.createElement('script');
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KJMJT32');`;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJMJT32"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }
  }

  ngOnInit() {
    this.broker.contenido_interface().subscribe( ( response: content ) => {
      this.txt = response;
      this.sesion.datos = response;
    },
    (error) => {
    }
    );
  }
}
