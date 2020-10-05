import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PqrService } from '../pqr.service';
import { MonthlyReports } from '../interfaces/monthly-reports';

@Component({
  selector: 'app-monthly-pqr-chart',
  templateUrl: './monthly-pqr-chart.component.html',
  styleUrls: ['./monthly-pqr-chart.component.css'],
})
export class MonthlyPqrChartComponent implements OnInit {
  public datas = [];
  //monthlyPqrReports: MonthlyReports[] = [];
  public lineChartData: ChartDataSets[] = [
    { data: this.datas, label: 'Total PQRs' },
    /*  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }, */
  ];
  //public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "#5260ff",
      backgroundColor: "rgba(82, 96, 255, 0.7)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private PqrServ: PqrService) {
    this.PqrServ.getMontlyReports().subscribe(
      (resp) => this.montlyData(resp),
      (err) => console.log(err)
    );
  }

  ngOnInit() {}

  montlyData(val) {
    let months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    val.forEach((element) => {
      this.lineChartLabels.push(months[element.mes - 1]);
      this.datas.push(element.total);
    });
    console.log(this.lineChartData);
  }
}
