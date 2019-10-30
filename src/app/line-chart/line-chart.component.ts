import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() apiUrl: string;
  @Input() chartType: string;

  public minTempData = [];
  public maxTempData = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public lineChartLabels: Label[] = [''];
  public lineChartOptions: (ChartOptions) = {
    responsive: true
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartPlugins = [pluginAnnotations];
  public lineChartType = '';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.apiUrl != '') {
      this.lineChartType = this.chartType;
      this.getData();
    }
  }
  ngOnInit() {
   
  }
  ngOnDestroy() {
   
  }

  getData() {
    // console.log(this.apiUrl);
    this.lineChartLabels = [];

    this.http.get(this.apiUrl).subscribe((result: any) => {
      console.log(result.data);
      for (let index = 0; index < result.data.length; index++) {
        this.lineChartLabels.push(result.data[index].month);
        this.minTempData.push(result.data[index].temperature_min);
        this.maxTempData.push(result.data[index].temperature_max);
      }
      this.lineChartData = [{ data: this.minTempData, label: 'Min Temp' }, { data: this.maxTempData, label: 'Max Temp' }];
      console.log(this.chartType);
      
    });
  }

}
