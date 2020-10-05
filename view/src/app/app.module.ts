import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PqrFormComponent } from './pqr-form/pqr-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PqrListComponent } from './pqr-list/pqr-list.component';
import { PqrModalComponent } from './pqr-list/pqr-modal/pqr-modal.component';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { MonthlyPqrChartComponent } from './monthly-pqr-chart/monthly-pqr-chart.component';
import { NeighborhoodPqrChartComponent } from './neighborhood-pqr-chart/neighborhood-pqr-chart.component';
import { MostIssuePqrChartComponent } from './most-issue-pqr-chart/most-issue-pqr-chart.component';
import { NeighborPqrBarChartComponent } from './neighbor-pqr-bar-chart/neighbor-pqr-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PqrFormComponent,
    PqrListComponent,
    PqrModalComponent,
    HomeComponent,
    MonthlyPqrChartComponent,
    NeighborhoodPqrChartComponent,
    MostIssuePqrChartComponent,
    NeighborPqrBarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
