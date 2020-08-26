import { Component, OnInit } from '@angular/core';
import { SesionService } from '@app/core/services/sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public content: SesionService) { }

  ngOnInit() {
  }

}
