import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class LoadService {
  title: any;
  text: any;
  closebtn: any;
  redirectOnClose: any;
  redirectSSO:any;
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
}
