import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../core/services/sesion.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(private sesion: SesionService) {
    localStorage.setItem('loggedIn', 'true');
    this.sesion.loggedIn = localStorage.getItem('loggedIn');
  }

  ngOnInit() {
  }

}
