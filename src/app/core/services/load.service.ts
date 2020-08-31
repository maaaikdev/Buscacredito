import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
// declare var bodymovin: any;
@Injectable({
  providedIn: 'root'
})
export class LoadService {
  title = '';
  text = '';
  closebtn = false;
  redirectOnClose: any;
  redirectSSO:any;
  show = false;
  constructor(private router: Router) { }

  close() {
    this.title = '';
    this.text = '';
    this.closebtn = false;
    $('#load-modal').modal('hide');
    if (this.redirectOnClose != undefined) {
      this.redirectOnClose != "" ? window.location.href=this.redirectOnClose : this.router.navigate([this.redirectOnClose]);
    }
  }

  open(title, text, close, redirect) {
    this.title = title;
    this.text = text;
    this.closebtn = close;
    this.redirectOnClose = redirect;
    $('#load-modal').modal({
      show: true,
      keyboard: false
    });
  }

  // open(title, textHTML, imagen, imagenclass, animacion) {
  //   this.isLoadingDarkWeb = false;
  //   if ($('#loadingAnimation').get(0)) {
  //     this.texto = textHTML;
  //     this.titulo = title;
  //     this.imgTop = imagen;
  //     this.imgClass = imagenclass;
  //     this.animacion = animacion;
  //     if (this.animacion) {
  //       $('#loadingAnimation').html('');
  //       const animation = bodymovin.loadAnimation({
  //         container: document.getElementById('loadingAnimation'),
  //         renderer: 'svg',
  //         loop: true,
  //         autoplay: true,
  //         path: this.imgTop,
  //         crossOrigin: null
  //       });
  //     }
  //     $('#loading').modal({ backdrop: 'static', keyboard: false });
  //   }
  // }
}
