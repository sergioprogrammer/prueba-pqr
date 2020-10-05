import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { CurrentMonthIssues } from "../interfaces/current-month-issues";
import { PqrService } from "../pqr.service";

@Component({
  selector: 'app-most-issue-pqr-chart',
  templateUrl: './most-issue-pqr-chart.component.html',
  styleUrls: ['./most-issue-pqr-chart.component.css']
})
export class MostIssuePqrChartComponent implements OnInit {

  /* labelChart = [];
  dataChart = []; */
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#FF5733', '#338DFF', '#FFC133', '#5B33FF', '#FF337D', '#FFF333'],
    borderColor: ['#FF5733', '#338DFF', '#FFC133', '#5B33FF', '#FF337D', '#FFF333']
 }];

  constructor(private PpqrServ:PqrService) {
    this.PpqrServ.getAllIssuesThisMonth().subscribe(
      resp => this.issuesData(resp),
      err => console.log(err)
    )
   }

  ngOnInit() {
  }

  issuesData(val){
    val.forEach(element => {
      this.pieChartLabels.push(element.nombre);
      this.pieChartData.push(element.total);
    });
    console.log();

  }
}
