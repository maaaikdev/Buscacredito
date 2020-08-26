import { Component, OnInit } from '@angular/core';
import { SimularService } from '../../core/services/simular.service';
import { SesionService } from '../../core/services/sesion.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '@app/core/services/location.service';
import { BrokerService } from '@app/core/services/broker.service';
// import { DetailComponent } from '../listing/detail/detail.component';

declare var $: any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  // oferta: any = {};
  loading: boolean = true;
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
  isHide: any;
  monto: any;
  meses: any;
  benefits: any;
  phone: any;
  adicional: any;
  formIncome: FormGroup;
  formContact: FormGroup;
  cities: any[] = [];
  cities2: any[] = [];
  city: any[] = [];
  professions = [
    {
      id: '1',
      profesion: 'Estudiante'
    },
    {
      id: '2',
      profesion: 'Empleado'
    },
    {
      id: '3',
      profesion: 'Independiente'
    },
    {
      id: '4',
      profesion: 'Pensionado'
    },
    {
      id: '5',
      profesion: 'Otro'
    }
  ];
  personalInfo = {
    telefono: 0,
    departamento: '',
    ciudad: '',
    direccion: '',
    locacion: null
  };
  ofertasList: any;
  promocode: any;
  // month: any = [
  //   {
  //     option: '1 mes',
  //     valueMonth: '1'
  //   }
  // ];
  month: any = [
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
  entitiesImg = [
    'DATAFAT',
    'LINERU',
    'PRESTAPLATA',
    'BANCOABC',
    'BANCOSUPERIOR',
    'FINANCIAL'
  ];
  urlImg: any = [
    {
      name: '',
      url: ''
    }
  ];
  constructor(
    public simular: SimularService,
    public sesion: SesionService,
    private router: Router,
    private location: LocationService,
    private broker: BrokerService) {

    this.location.jsonDpt()
      .subscribe((dataC: any) => {
        this.cities = dataC.citys;
        this.cities = this.cities.sort(this.dynamicSort('idDept'));
        this.cities = this.dptosFilter(this.cities, 'idDept');
        if (simular.data.aditional.location.dept !== null || simular.data.aditional.location.dept !== '') {
          for (var i = 0; i < this.cities.length; i++) {
            for (var key in this.cities[i]) {
              if (this.cities[i][key].indexOf(simular.data.aditional.location.dept) != -1) {
                // results.push(this.cities.[i]);
                // console.log('this.cities.s', this.cities[i]);
                this.personalInfo.locacion = this.cities[i];
                this.formContact.controls.departamento.patchValue(this.cities[i]);
                this.formContact.controls.ciudad.patchValue(this.cities[i]);
              }
            }
          }
        }
      });
    const data = this.simular.getStorage();
    // const promo = this.simular.promocode.getStorage();
    // console.log('promo', data);
    // this.sesion.loggedIn = localStorage.getItem('loggedIn');
    this.monto = simular.data.simulation.valueMoney;
    this.meses = simular.data.simulation.valueMonth;
    this.phone = parseInt(simular.data.personal.phone);
    this.adicional = simular.data.aditional;
    // console.log('this adicional', this.adicional);
    this.personalInfo = {
      telefono: this.phone,
      departamento: this.adicional.location,
      ciudad: this.adicional.location,
      direccion: this.adicional.address,
      locacion: this.adicional.location
    }
    // console.log('locacion', this.personalInfo.locacion);
    this.formContact = new FormGroup({
      telefono: new FormControl('',
        [Validators.required, Validators.pattern('^[1-9][0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]),
      departamento: new FormControl(this.personalInfo.locacion, Validators.required),
      ciudad: new FormControl({ value: '', disabled: true }, Validators.required),
      direccion: new FormControl('', Validators.required)
    });
    this.formIncome = new FormGroup({
      profesion: new FormControl(this.adicional.occupation, Validators.required),
      salario: new FormControl(this.adicional.monthyIncome, Validators.required)
    });
    this.formContact.patchValue({
      telefono: this.personalInfo.telefono,
      direccion: this.personalInfo.direccion,
      departamento: this.personalInfo.locacion
      // ciudad: this.personalInfo.locacion
    });
    // console.log('this.personalInfo.locacion', this.personalInfo.locacion);
  }

  ngOnInit() {
    // /ofertas/detalle?id=1
    this.cambiarQuery();
    this.isHide = false;
    $('#modal-info').modal('hide');
  }
  showMob() {
    // form-mob show
    this.isHide = true;
  }
  actualizarSimulacion(info: NgForm) {
    // console.log('info value', info.value.monto);
    // form-mob hide
    if (this.isHide) {
      this.isHide = false;
    }
    if (info.value.monto >= 10000000) {
      // console.log('mayor a 10mil', info.value.monto);
      info.value.monto = 10000000;
      this.monto = 10000000;
      this.simular.data.simulation.valueMoney = info.value.monto;
    }
    if (this.monto < 150000){
      info.value.monto = 150000;
      this.monto = 150000;
      this.simular.data.simulation.valueMoney = info.value.monto;
    } 
    if (info.value.monto === 0) {
      info.value.monto = 150000;
      this.monto = 150000;
      this.simular.data.simulation.valueMoney = parseInt(info.value.monto);
    }
    if (info.value.meses === 0) {
      info.value.meses = 1;
      this.simular.data.simulation.valueMonth = info.value.meses.toString();
    }

    this.simular.data.simulation.valueMoney = parseInt(info.value.monto);
    this.simular.data.simulation.valueMonth = info.value.meses.toString();
    this.simular.data.personal.phone = this.formContact.value.telefono;
    this.simular.data.aditional.location.cityId = this.formContact.value.departamento.cityId;
    this.simular.data.aditional.location.nomCity = this.formContact.value.departamento.nomCity;
    this.simular.data.aditional.location.idDept = this.formContact.value.departamento.idDept;
    this.simular.data.aditional.location.dept = this.formContact.value.departamento.dept;
    this.simular.data.aditional.address = this.formContact.value.direccion;
    this.simular.data.aditional.occupation = this.formIncome.value.profesion;
    this.simular.data.aditional.monthyIncome = this.formIncome.value.salario;
    this.simular.updateStorage();
    this.cambiarQuery();
  }
  cambiarQuery() {
    this.loading = true;
    $('#load-modal').modal('show');
    this.broker.obtener_ofertas(this.simular.data).subscribe((response: any) => {
      this.loading = false;
      this.promocode = response.promoCode;
      $('#load-modal').modal('hide');
      this.ofertasList = response.offers;
      this.sesion.offers = response.offers;
      this.cargarLogos();
      setTimeout(() => {
        localStorage.setItem('offers', JSON.stringify(this.ofertasList));
      }, 200);
      this.monto = this.simular.data.simulation.valueMoney;
      this.meses = this.simular.data.simulation.valueMonth;
    },
      error => {
        this.router.navigate(['error']);
        $('#load-modal').modal('hide');
        this.loading = false;
      });
  }
  scrollTo() {
    $('html, body').animate({
      scrollTop: $('.listing').offset().top
    }, 1000);
  }
  verOferta(data) {
    // console.log('ver ofertas', data);
    // this.router.navigate(['/ofertas/detalle/' + data.id]);
    this.router.navigate(['/ofertas/detalle/'], { queryParams: { id: data.id } });
  }
  dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    }
  }

  dptosFilter(arr, prop) {
    const nuevoArray = [];
    const lookup = {};
    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }
    return nuevoArray;
  }
  cargarCiudades() {
    // console.log('change depto');
    let dptoSelect = this.formContact.controls.departamento.value.idDept;
    this.location.jsonDpt()
      .subscribe((data: any) => {
        this.formContact.controls.ciudad.enable();
        this.cities2 = data.citys;
        this.city = this.cities2.filter(c => c.idDept === dptoSelect);
      });
  }
  cargarLogos() {
    const entitiLogo = this.ofertasList.map(offer => {
      offer.imgN = 'otro';
      const nameEn = offer.entity.replace(/\s/g, '');
      // nameEn = nameEn.replace(/\b[A-Z]{2,}\b/g);
      // console.log('nameEn', nameEn);
      // return nameEn;
      this.entitiesImg.forEach(element => {
        // console.log(element)
        if (nameEn === element) {
          // console.log('es igual', element)
          offer.imgN = offer.entity.replace(/\s/g, '');
          offer.imgN = offer.imgN.toLowerCase();
          // console.log('offer.imgN', offer.imgN);
        }
      });
    });
    // console.log('url img', this.urlImg);
    // console.log('url img', this.ofertasList);
  }
}

