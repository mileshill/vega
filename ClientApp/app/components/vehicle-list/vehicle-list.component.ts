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
  private readonly PAGE = 1;
  private readonly PAGE_SIZE = 10;

  queryResult: any = {};
  makes: KeyValuePair[];
  models: KeyValuePair[];
  query: any = {
    page: this.PAGE,
    pageSize:this.PAGE_SIZE
  };
  columns = [
    // {title: HTML Label, key: sent to server, isSortable: boolean=false}
    {title: 'Id'},
    {title: 'Make', key: 'make', isSortable: true},
    {title: 'Model', key: 'model', isSortable: true},
    {title: 'Contact Name', key: 'contactName', isSortable: true},
    {}
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => {this.makes = makes;});

    this.populateVehicles();
  }


  populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => {
        this.queryResult = result;
      })
  }


  onFilterChange(){
    this.populateVehicles();
    this.resetQueryDefaults();
  }

  resetFilter(){
    this.resetQueryDefaults();
    this.populateVehicles();
  }


  resetQueryDefaults(){
    this.query = {
      page: this.PAGE,
      pageSize: this.PAGE_SIZE
    };
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

  onPageChange(page){
    this.query.page = page;
    this.populateVehicles();
  }
}
