import { BrowserXhr } from '@angular/http';
import { ProgressService, BrowserXhrWithProgress } from './services/progress.service';
import { PhotoService } from './services/photo.service';
import * as Raven from 'raven-js';

import { ErrorHandler } from '@angular/core';
import { VehicleService } from './services/vehicle.service';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AppErrorHandler } from "./app.error-handler";
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

Raven
  .config('https://84d759ec50e644e3ab681f1a7831d839@sentry.io/170092')
  .install();


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component : VehicleFormComponent},
            { path: 'vehicles/edit/:id', component: VehicleFormComponent},
            { path: 'vehicles/:id', component: ViewVehicleComponent},
            { path: 'vehicles', component: VehicleListComponent},
            { path: '**', redirectTo: 'vehicles' }
        ])
    ],
    providers: [
        {provide: ErrorHandler, useClass: AppErrorHandler},
        {provide: BrowserXhr, useClass: BrowserXhrWithProgress},
        VehicleService,
        PhotoService,
        ProgressService
    ]
})
export class AppModule {
}
