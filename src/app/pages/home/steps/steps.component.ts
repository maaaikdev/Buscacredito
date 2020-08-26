import { Component, OnInit } from '@angular/core';
import { SesionService } from '@app/core/services/sesion.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  constructor(public sesion: SesionService) {}

  ngOnInit() {
  }

}
