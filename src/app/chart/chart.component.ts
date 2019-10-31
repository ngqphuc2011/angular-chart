import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges, DoCheck, AfterViewInit, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() apiUrl: string;
  @Input() chartType: string;

  public minTempData = [];
  public maxTempData = [];

  public chartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public chartLabels: Label[] = [''];
  public chartOptions: (ChartOptions) = {
    responsive: true
  };

  public chartColors: Color[] = [
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
  public chartLegend = true;
  public chartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.apiUrl != '') {
      // console.log(this.apiUrl);
      // console.log(this.chartType);
      this.chartData = [];
      this.getData();
    }
  }


  getData() {
    this.chartLabels = [];
    this.http.get(this.apiUrl).subscribe((result: any) => {
      for (let index = 0; index < result.data.length; index++) {
        this.chartLabels.push(result.data[index].month);
        this.minTempData.push(result.data[index].temperature_min);
        this.maxTempData.push(result.data[index].temperature_max);
      }
      this.chartData = [{ data: this.minTempData, label: 'Min Temp' }, { data: this.maxTempData, label: 'Max Temp' }];
      console.log(result.data);

    });
  }

}
