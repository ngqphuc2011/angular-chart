import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges, DoCheck, AfterViewInit, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() apiUrl: string;
  @Input() chartType: string;

  public chartFigure0 = [];
  public chartFigure1 = [];
  public chartFigure2 = [];

  public chartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public chartLabels: Label[] = [''];
  public chartOptions: (ChartOptions) = {
    responsive: false
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
        this.chartFigure0.push(result.data[index].temperature_min);
        this.chartFigure1.push(result.data[index].temperature_max);
        this.chartFigure2.push(result.data[index].temperature_mean);
      }
      this.chartData = [{ data: this.chartFigure0, label: 'Min Temp' }, { data: this.chartFigure1, label: 'Max Temp' }, { data: this.chartFigure2, label: 'Mean Temp' }];
      // console.log(result.data);

    });
  }


  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[activePoints[0]._datasetIndex].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value);
        // console.log(activePoints);
        // console.log(e);
      }
    }
  }
}
