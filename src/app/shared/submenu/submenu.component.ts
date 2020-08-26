import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../core/services/sesion.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
  constructor(public sesion: SesionService) {
  }
  ngOnInit() {
    this.sesion.loggedIn = localStorage.getItem('loggedIn');
  }

}
