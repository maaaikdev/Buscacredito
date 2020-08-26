import { Component, OnInit, Input} from '@angular/core';
import { ModalService } from '@app/core/services/modal.service';

declare var $: any;

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements  OnInit {

  rad: any;
  radUrl: any;
  radParam: any;

  constructor(public modal: ModalService) {
  }

  ngOnInit() {
    // console.log(this.radicado);
  }

  test() {
    $('#formTest').submit();
  }
}
