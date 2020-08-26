import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  imgSrc: any;
  title: string;
  txtStep: string;
  step1: any;

  constructor() { }

  ngOnInit() {
    this.step1 = true;
    this.imgSrc = 'assets/icons/new/intro.svg';
    this.title = 'Bienvenido a Buscacrédito';
    this.txtStep = 'Aquí puedes buscar, comparar y elegir ofertas de crédito de bajos montos, personalizadas a tu perfil crediticio, sin ningún costo.  <br><br> Actualmente te encuentras navegando la versión Beta de Buscacrédito. Pronto tendremos nuevos aliados para ofrecerte más alternativas de crédito.';
  }

  nextStep(){
    this.step1 = false;
    this.imgSrc = 'assets/icons/new/huella.svg';
    this.title = 'Huella de consulta';
    this.txtStep = '“La huella, es el registro que se genera en la historia crediticia de un ciudadano, cada que se hace una consulta sobre este, en una entidad financiera.”<br><br> Puedes consultar cuantas veces quieras el detalle de las ofertas que generamos para ti. <br><br> ¡Pero recuerda! Una vez apliques a una oferta, esto quedará registrado en tu historial crediticio.';
  }
  prevStep(){
    this.step1 = true;
    this.imgSrc = 'assets/icons/new/intro.svg';
    this.title = 'Bienvenido a Buscacrédito';
    this.txtStep = 'Aquí puedes buscar, comparar y elegir ofertas de crédito de bajos montos, personalizadas a tu perfil crediticio, sin ningún costo.  <br><br> Actualmente te encuentras navegando la versión Beta de Buscacrédito. Pronto tendremos nuevos aliados para ofrecerte más alternativas de crédito.';
  }
}
