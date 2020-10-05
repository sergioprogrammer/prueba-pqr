import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { PqrService } from './../pqr.service';
import { NeighborhoodReport } from './../interfaces/neighborhood-report';

@Component({
  selector: 'app-neighbor-pqr-bar-chart',
  templateUrl: './neighbor-pqr-bar-chart.component.html',
  styleUrls: ['./neighbor-pqr-bar-chart.component.css'],
})
export class NeighborPqrBarChartComponent implements OnInit {
  neighborhoodPqr: NeighborhoodReport[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: SingleDataSet = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#FF5733', '#338DFF', '#FFC133', '#5B33FF', '#FF337D', '#FFF333'],
    borderColor: ['#FF5733', '#338DFF', '#FFC133', '#5B33FF', '#FF337D', '#FFF333']
 }];
  /*   public barChartData: ChartDataSets[] = [

  ]; */

  constructor(private pqrServ: PqrService) {
    this.pqrServ.getNeighborhoodReports().subscribe(
      (resp) => this.barriosData(resp),
      (err) => console.log(err)
    );
  }

  ngOnInit() {}

  barriosData(valor) {
    valor.forEach((element) => {
      this.barChartLabels.push(element.namenb);
      this.barChartData.push(element.cantidad);
      /*         this.barChartData.push({ data: [element.cantidad], label: element.namenb });
       console.log(this.barChartData) */
    });
    /*       console.log(this.barChartData); */
  }
}
