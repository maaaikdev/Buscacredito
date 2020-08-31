import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../../core/services/broker.service'
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-financial-info',
  templateUrl: './financial-info.component.html',
  styleUrls: ['./financial-info.component.scss']
})
export class FinancialInfoComponent implements OnInit {

  public ingresos = [
    {'name':'Menos $1.000.000', 'value' : '1000000'},
    {'name':'Entre $1.000.000 - $1.500.000', 'value' : '1500000'},
    {'name':'Entre $1.500.000 - $2.000.000', 'value' : '2000000'},
    {'name':'Entre $2.000.000 - $2.500.000', 'value' : '2500000'},
    {'name':'Entre $2.500.000 - $3.000.000', 'value' : '3000000'},
    {'name':'Entre $3.500.000 - $4.000.000', 'value' : '4000000'},
    {'name':'Mas $4.000.000', 'value' : '4500000'}
  ]

  public ingresoSelec;

  constructor(private brokerService : BrokerService, private router: Router) {
   }

  ngOnInit() {
  }


  agregarIngresos(){
    $('#load-modal').modal('show');
    if(!isNaN(this.ingresoSelec)){
      this.brokerService.setIngresos(this.ingresoSelec).subscribe(
        result => {
          if(result.code == "200"){
            $('#load-modal').modal('hide');
            this.router.navigate(["/ofertas"]);
          }
        }
      );
    }
  }

  desplegar(){    
    var contentSelector = document.getElementsByClassName("content-select")[0];
    if(contentSelector.classList.contains("no-active")){
      contentSelector.classList.remove("no-active");
      contentSelector.classList.add("active");
    }
    else if(contentSelector.classList.contains("active")){
      contentSelector.classList.remove("active");
      contentSelector.classList.add("no-active");
    }
  }

  selVal(element){
    var liSel = element.target;
    var bodySel = document.getElementsByClassName("body-select")[0];
    var label = bodySel.children[0].children[1];
    let ingreso = this.ingresos.find((ele,index) => index == liSel.value)
    label.innerHTML = ingreso.name;
    var contentSelector = document.getElementsByClassName("content-select")[0];
    contentSelector.classList.remove("active");
    contentSelector.classList.add("no-active");
    var boxSelect = document.getElementsByClassName("custom-box-select")[0]
    boxSelect.classList.add("with-content");
    this.ingresoSelec = ingreso.value;
  }

  atras(){
    window.history.back();
  }

}
