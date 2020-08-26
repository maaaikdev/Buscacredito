import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { SimularService } from '../../core/services/simular.service';
import { SesionService } from '@app/core/services/sesion.service';
import { environment } from 'environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]
    )
  ]
})
export class SimulatorComponent implements OnInit {
  simulation: FormGroup;
  select: any;
  month: any = [
    {
      option: '1 mes',
      valueMonth: '1'
    }
  ];
  monthP: any = [
    {
      option: '1 mes',
      valueMonth: '1'
    },
    {
      option: '12 meses',
      valueMonth: '12'
    },
    {
      option: '24 meses',
      valueMonth: '24'
    },
    {
      option: '36 meses',
      valueMonth: '36'
    },
    {
      option: '48 meses',
      valueMonth: '48'
    },
    {
      option: '60 meses',
      valueMonth: '60'
    }
  ];
  products: any = [
    {
      id: 1,
      tag: 'deudas',
      name: 'Pagar Deudas',
      icon: 'icon-prod-1'
    },
    {
      id: 2,
      tag: 'tarjeta',
      name: 'Tarjeta de crédito',
      icon: 'icon-prod-6'
    },
    {
      id: 3,
      tag: 'ropa',
      name: 'Comprar ropa',
      icon: 'icon-prod-3'
    },
    {
      id: 4,
      tag: 'transporte',
      name: 'Medio de transporte',
      icon: 'icon-prod-4'
    },
    {
      id: 5,
      tag: 'negocio',
      name: 'Financiar mi negocio',
      icon: 'icon-prod-5'
    },
    {
      id: 6,
      tag: 'viaje',
      name: 'Planear viaje',
      icon: 'icon-prod-2'
    }
  ];
  isMore = false;
  cookie: any;
  loginUrl: string;
  constructor(private simular: SimularService, public sesion: SesionService, public router: Router) {
    this.loginUrl = environment.urlLogin;
    this.select = {
      id: 1,
      tag: 'deudas',
      name: 'Pagar Deudas',
      icon: 'icon-prod-1'
    };
    this.cookie = this.sesion.sesionCookie;
    // if (this.sesion.sesionCookie) {
    //   this.router.navigate(['/'], { fragment: 'form1' });
    //   this.simulation = new FormGroup({
    //     monto: new FormControl(this.simular.data.simulation.valueMoney),
    //     cuotas: new FormControl(this.simular.data.simulation.valueMonth)
    //   });
    // } else {
    //   $('#modal-info').modal('hide');
    //   this.simulation = new FormGroup({
    //     monto: new FormControl(),
    //     cuotas: new FormControl()
    //   });
    // }    

    setTimeout(() => {
      this.cookie = this.sesion.sesionCookie;
    }, 200);
  }
  saveFirst() {
    // guardar simulacion antes de iniciar sesion
    if (!this.simulation.value.cuotas) {
      this.simular.data.simulation.valueMonth = '1';
      this.simular.updateStorage();
    } else {
      this.simular.data.simulation.valueMonth = this.simulation.value.cuotas.toString();
      this.simular.updateStorage();
    }
    if (!this.simulation.value.monto) {
      this.simular.data.simulation.valueMoney = 200000;
      this.simular.updateStorage();
    } else {
      this.simular.data.simulation.valueMoney = this.simulation.value.monto;
      this.simular.updateStorage();
    }
    // this.simular.updateStorage();
    setTimeout(() => {
      window.location.href = this.loginUrl;
    }, 200);
  }

  guardarSimulacion() {
    this.simular.data.simulation.valueMonth = this.simulation.value.cuotas.toString();
    this.simular.data.simulation.valueMoney = this.simulation.value.monto;
    if (this.simulation.value.cuotas === '') {
      this.simulation.value.cuotas = '1';
    }
    if (!this.simulation.value.monto) {
      this.simulation.value.monto = 1000000;
    }
    if (this.simulation.value.monto > 899999) {
      this.isMore = true;
      if (this.simulation.value.monto > 10000000) {
        this.simulation.get('monto').setValue(10000000);
      }
    } else if (this.simulation.value.monto <= 900000) {
      this.simulation.get('cuotas').patchValue(this.month);
      this.isMore = false;
    }
  }
  ngOnInit() {    
  }
}
