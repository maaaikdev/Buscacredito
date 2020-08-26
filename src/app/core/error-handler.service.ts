import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler{

  constructor(private injector: Injector) { }
  handleError(error: any){
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse){
    // console.error('status code', error.status);
    // console.error('repsonse body', error.message);
    }else{
      // console.error(' an error ocurred', error.message);
    }

    if (localStorage.getItem('loggedIn') && router.url !== '') {
      router.navigate(['error']);
      return false;
    }
    // router.navigate(['error']);
  }
}
