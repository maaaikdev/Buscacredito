import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items-offers',
  templateUrl: './items-offers.component.html',
  styleUrls: ['./items-offers.component.scss']
})
export class ItemsOffersComponent implements OnInit {

  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
