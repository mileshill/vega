import { Injectable, enableProdMode } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http) { }

  getVehicles(filter){
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj){
    let parts = [];
    for (let property in obj){
      let value = obj[property];
      if(value != null && value != undefined){
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value))
      }
    }
    return parts.join('&');
  }

  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getMakes(){
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getFeatures(){
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  create(vehicle){
    vehicle.id = 0;
    return this.http.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle){

    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id){
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }
}
