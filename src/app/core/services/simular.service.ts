import { Injectable } from '@angular/core';
import { BrokerService } from './broker.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimularService {
  $: any;
  dataStorage: any;

  data = {
    personal: {
      firstName: '',
      lastName: '',
      document: '',
      phone: '',
      email: '',
      terms: null,
      idApi: 'F',
      idUserApi : 'dsafsdgfdgt',
      documentType: {
        type: '',
        code: '',
        name: ''
      },
      expDate: null
    },
    aditional: {
      address: '',
      occupation: '',
      monthyIncome: '',
      location: {
        cityId: '',
        dept: '',
        idDept: '',
        nomCity: ''
      }
    },
    simulation: {
      valueMoney: 1000000,
      valueMonth: '1',
      product: {
        id: 1,
        tag: 'deudas',
        name: 'Pagar Deudas',
        icon: 'icon-prod-1'
      }
    },
    idUsuario: 0,
    country:environment.country
  };

  ofertas: any;
  totalListing: number;
  promocode: string;
  benefits: any;

  constructor(public broker: BrokerService, private router: Router) {
  }

  validacionInicial() {
    const body = {
      identificacion: this.data.personal.document,
      tipoIdentificacion: this.data.personal.documentType.type,
      primerApellido: this.data.personal.lastName,
      nombres: this.data.personal.firstName,
      fechaExpedicion: this.data.personal.expDate,
      country:environment.country
    };

    
    return body;
  }

  actualizarPersonal(info: any) {
    const expd = new Date(info.expedicion).getTime();
    // const apellido = info.apellido.split(' ');
    this.data.personal.firstName = info.nombre;
    this.data.personal.lastName = info.apellido;
    this.data.personal.document = info.documento;
    this.data.personal.phone = info.telefono;
    this.data.personal.email = info.mail;
    this.data.personal.terms = info.terminos;
    this.data.personal.documentType.type = info.tipo.tipo;
    this.data.personal.documentType.code = info.tipo.codigo;
    this.data.personal.documentType.name = info.tipo.nombre;
    this.data.personal.expDate = expd;
    
    this.updateStorage();

    return true;
  }

  actualizarAdicional(info: any) {
    this.data.aditional.address = info.direccion;
    this.data.aditional.occupation = info.profesion;
    this.data.aditional.monthyIncome = info.salario;
    this.data.aditional.location.cityId = info.ciudad.cityId;
    this.data.aditional.location.nomCity = info.ciudad.nomCity;
    this.data.aditional.location.idDept = info.ciudad.idDept;
    this.data.aditional.location.dept = info.ciudad.dept;

    this.updateStorage();

    return true;
  }

  getStorage() {
    this.dataStorage = localStorage.getItem('simulacion');
    if(this.dataStorage){
      this.data = JSON.parse(this.dataStorage);
    }
    return this.data;
  }
  
  updateStorage(){
    this.dataStorage = localStorage.setItem('simulacion', JSON.stringify(this.data));
  }

  consultarOfertas() {
    this.dataStorage = localStorage.getItem('simulacion');
    this.data = JSON.parse(this.dataStorage);
    this.broker.obtener_ofertas(this.data).subscribe( ( response: any ) => {
      // console.log('resssss', response.offers.length);
      this.ofertas = response.offers;
      this.promocode = response.promoCode;
      this.totalListing = response.offers.length;
      this.beneficios();
      // console.log('ofertas res', this.ofertas);
    },
    error => {
      this.router.navigate(['error']);
      // $('#load-modal').modal('hide');
      // console.log('error', error);
    });
  }
  
  beneficios(){
    this.ofertas.forEach(element => {
      this.benefits = JSON.parse(element.benefits);
      // console.log('this.benefits', this.benefits);
    });
  }

  updateInfoSesion(info) {
    this.data.personal.firstName = info.personal.firstName;
    this.data.personal.lastName = info.personal.lastName;
    this.data.personal.expDate = new Date(info.personal.expDate);
    this.data.personal.document = info.personal.document;
    this.data.personal.phone = info.personal.phone;
    this.data.personal.email = info.personal.email;
    this.data.personal.terms = info.personal.terms;
    this.data.personal.documentType.type = info.personal.documentType.type;
    // validar con condicionales codigo y nombre
    if ( info.personal.documentType.type === '1') {
      this.data.personal.documentType.code = 'cc';
      this.data.personal.documentType.name = 'Cédula de ciudadanía';
    }
    if ( info.personal.documentType.type === '4') {
      this.data.personal.documentType.code = 'ce';
      this.data.personal.documentType.name = 'Cédula de extranjería';
    }
    this.data.aditional.address = info.aditional.address;
    this.data.aditional.occupation = info.aditional.occupation;
    this.data.aditional.monthyIncome = info.aditional.monthyIncome;
    this.data.idUsuario = info.personal.id;
    this.data.country = environment.country;
    this.data.aditional.location.cityId = info.aditional.location.cityId;
    this.data.aditional.location.idDept = info.aditional.location.idDept;    
    this.updateStorage();
  }

}
