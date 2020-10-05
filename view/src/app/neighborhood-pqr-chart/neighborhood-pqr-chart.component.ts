import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { PqrService } from './../pqr.service';
import { NeighborhoodReport } from './../interfaces/neighborhood-report';

@Component({
  selector: 'app-neighborhood-pqr-chart',
  templateUrl: './neighborhood-pqr-chart.component.html',
  styleUrls: ['./neighborhood-pqr-chart.component.css'],
})
export class NeighborhoodPqrChartComponent implements OnInit {
  neighborhoodPqr: NeighborhoodReport[] = [];
  public dataNumber: SingleDataSet = [];
  public pieChartType: ChartType = 'bar';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public dataLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  constructor(private pqrServ: PqrService) {
    this.pqrServ.getNeighborhoodReports().subscribe(
      resp => this.barriosData(resp),
      err => console.log(err)
    )

    }

  ngOnInit() {

  }

  barriosData(valor){
   // var chartBars = this.barChartData;
   /*  var dataNumber = this.dataNumber;
    var dataLabels = this.dataLabels; */
    valor.forEach(element => {
      /* dataNumber.push(element.cantidad);
      dataLabels.push(element.namenb); */
     // chartBars.push({ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' })
    });
    //console.log(dataNumber);
  }



}
