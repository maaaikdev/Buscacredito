import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private citiesURL = 'assets/data/cities.json';
  cities: any[];
  constructor( private http: HttpClient) {
    this.jsonDpt()
   }
  public getJSON(): Observable<any> {
    return  this.http.get(this.citiesURL);
  }
  dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a,b) => {
      if(sortOrder == -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
    }
  }
  jsonDpt(){
    return this.http.get(this.citiesURL);
  }
}
