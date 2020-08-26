import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { LoadService } from '@app/core/services/load.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, AfterContentChecked {

  constructor(public load: LoadService, private cd: ChangeDetectorRef) { }

  ngOnInit() {    
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

}
