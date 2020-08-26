import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { trigger, style, animate, transition } from '@angular/animations';
import { LocationService } from '@app/core/services/location.service';
import { map } from 'rxjs/operators';
import { SimularService } from '../../core/services/simular.service';
import { Router, NavigationEnd } from '@angular/router';
import { BrokerService } from '../../core/services/broker.service';
import { SesionService } from '@app/core/services/sesion.service';
import { environment } from 'environments/environment';

declare var $: any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
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
export class InfoComponent implements OnInit {

  form1: FormGroup;
  form2: FormGroup;
  isHide1: Boolean = false;
  isHide2: Boolean = false;
  isHide3: Boolean = false;
  titlePaso: string;
  cities: any[] = [];
  cities2: any[] = [];
  city: any[] = [];
  loading = false;
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

  tipos = [
    {
      tipo: '1',
      codigo: 'cc',
      nombre: 'Cédula de ciudadanía'
    },
    {
      tipo: '4',
      codigo: 'ce',
      nombre: 'Cédula de extranjería'
    }
  ];
  infoSesion: any;
  tipoNameRes: any;

  constructor(private location: LocationService, private simular: SimularService, private router: Router, public broker: BrokerService, public sesion: SesionService) {
    this.location.jsonDpt()
      .subscribe((data: any) => {
        this.cities = data.citys;
        this.cities = this.cities.sort(this.dynamicSort('idDept'));
        this.cities = this.dptosFilter(this.cities, 'idDept');
      });
    this.form1 = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')]),
      tipo: new FormControl('', Validators.required),
      documento: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$'), Validators.maxLength(10), Validators.minLength(7)]),
      expedicion: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('',
        [Validators.required, Validators.pattern('^[1-9][0-9]*$'), Validators.max(4000000000)]),
      terminos: new FormControl('', Validators.requiredTrue)
    });
    this.form2 = new FormGroup({
      departamento: new FormControl('', Validators.required),
      ciudad: new FormControl({ value: '', disabled: true }, Validators.required),
      direccion: new FormControl(null, Validators.required),
      profesion: new FormControl('', Validators.required),
      salario: new FormControl(null, [Validators.required, Validators.maxLength(9), Validators.minLength(6)])
    });
    this.titlePaso = '¡Queremos conocerte!';

    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     if (val.url == '/#form1' ||val.url == '/#form2') {
    //       this.setData();
    //     }
    //   }
    // });
  }
  setData() {
    const data = {
      clientId: environment.clientId,
      idSession: this.sesion.sesionCookie,
      country: environment.country
    };
    this.broker.validar_sesion(data).subscribe((response: any) => {
      const dataInfo = {
        country: environment.country,
        tipoDocumento: response.tipoDocumento,
        documento: response.documento
      };
      this.broker.obtener_informacion(dataInfo).subscribe((res: any) => {
        this.simular.updateInfoSesion(res);
        if (res.personal.hasAditional) {
          $('#modal-info').modal('hide');
          this.sesion.infoComplete = res.personal.hasAditional;
          setTimeout(() => {
            this.router.navigate(['/ofertas']);
          }, 200);
        }
        else {
          $('#modal-info').modal('show');
          this.infoSesion = res;
          const tipos = this.tipos;
          for (var i = 0; i < tipos.length; i++) {
            for (var key in tipos[i]) {
              if (tipos[i][key].indexOf(response.tipoDocumento.toString()) != -1) {
                this.tipoNameRes = tipos[i];
              }
            }
          }
          let expDate = new Date(res.personal.expDate);
          this.form1.patchValue({
            nombre: res.personal.firstName,
            apellido: res.personal.lastName,
            tipo: this.tipoNameRes,
            expedicion: this.formatDate(expDate),
            telefono: res.personal.phone,
            documento: res.personal.document,
            mail: res.personal.email
          });
          this.form2.patchValue({
            salario: res.aditional.monthyIncome,
            profesion: res.aditional.occupation,
            direccion: res.aditional.address
          });
        }
      }, error => {
        $('#modal-info').modal('hide');
        this.router.navigate(['/']);
      });
    },
      error => {
        $('#modal-info').modal('hide');
      }
    );
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  guardarInfoPersonal() {
    debugger;
    if (this.form1.valid) {
      let expd = this.form1.value.expedicion;
      expd = new Date(expd);
      expd = expd.setDate(expd.getDate() + 1);
      expd = new Date(expd).getTime();
      this.simular.data.personal.firstName = this.form1.value.nombre;
      this.simular.data.personal.lastName = this.form1.value.apellido;
      this.simular.data.personal.expDate = expd;
      this.simular.data.personal.document = this.form1.value.documento;
      this.simular.data.personal.phone = this.form1.value.telefono;
      this.simular.data.personal.email = this.form1.value.mail;
      this.simular.data.personal.terms = this.form1.value.terminos;
      this.simular.data.personal.documentType.type = this.form1.value.tipo.tipo;
      this.simular.data.personal.documentType.code = this.form1.value.tipo.codigo;
      this.simular.data.personal.documentType.name = this.form1.value.tipo.nombre;
      this.simular.updateStorage();
      this.isHide1 = true;
      this.titlePaso = 'Información adicional';
      this.loading = false;
      this.router.navigate(['/'], { fragment: 'form2' });
    }
  }


  backPersonal() {
    if (this.isHide1) {
      this.isHide1 = false;
      this.titlePaso = 'Información personal';
      this.router.navigate(['/'], { fragment: 'form1' });
    }
  }

  guardarInformacionAdicional() {
    const model = this;

    this.isHide2 = true;
    this.titlePaso = 'Buscando ofertas';
    this.simular.data.aditional.address = this.form2.value.direccion;
    this.simular.data.aditional.occupation = this.form2.value.profesion;
    this.simular.data.aditional.monthyIncome = this.form2.value.salario;
    this.simular.data.aditional.location.cityId = this.form2.value.ciudad.cityId;
    this.simular.data.aditional.location.nomCity = this.form2.value.ciudad.nomCity;
    this.simular.data.aditional.location.idDept = this.form2.value.ciudad.idDept;
    this.simular.data.aditional.location.dept = this.form2.value.ciudad.dept;
    this.simular.data.idUsuario = this.infoSesion.personal.id;
    this.simular.data.country = environment.country;

    this.simular.updateStorage();
    this.loading = true;
    $('#modal-load').modal('show');
    this.broker.actualizar_adicional(this.simular.data).subscribe((response: any) => {
      if (!response) {
        this.isHide2 = false;
        this.isHide3 = true;
        this.titlePaso = '¡Falta poco!';
        this.loading = false;
        $('#modal-load').modal('hide');
      } else {
        this.titlePaso = ' ';
        this.isHide3 = false;
        this.router.navigate(['/ofertas']);
        $('#modal-info').modal('hide');
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
        $('#modal-info').modal('hide');
        this.router.navigate(['/'], { fragment: 'false' });
      });
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
    let dptoSelect = this.form2.controls.departamento.value.idDept;
    this.location.jsonDpt()
      .subscribe((data: any) => {
        this.form2.controls.ciudad.enable();
        this.cities2 = data.citys;
        this.city = this.cities2.filter(c => c.idDept === dptoSelect);
      });
  }

  ngOnInit() {
    //this.setData();
  }
}
