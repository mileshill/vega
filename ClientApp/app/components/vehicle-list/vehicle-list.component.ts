import { Vehicle } from './../../models/IVehicle';
import { KeyValuePair } from './../../models/IKeyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  query: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => {this.makes = makes;});

    this.populateVehicles();
  }


  populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(vehicles => {
        this.vehicles = vehicles;
      })
  }

  onFilterChange(){
    this.populateVehicles();
  }

  resetFilter(){
    this.query = {};
    this.populateVehicles();
  }

  sortBy(columnName){
    if(this.query.sortBy === columnName){
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();

  }
}
