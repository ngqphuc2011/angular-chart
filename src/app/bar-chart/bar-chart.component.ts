import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() apiUrl: string;
  @Input() chartType: string;

  public minTempData = [];
  public maxTempData = [];

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.apiUrl != '') {
      this.getData();
    }
  }

  ngOnInit() {
  }

  getData() {
    // console.log(this.apiUrl);
    this.barChartLabels = [];

    this.http.get(this.apiUrl).subscribe((result: any) => {
      console.log(result.data);
      for (let index = 0; index < result.data.length; index++) {
        this.barChartLabels.push(result.data[index].month);
        this.minTempData.push(result.data[index].temperature_min);
        this.maxTempData.push(result.data[index].temperature_max);
      }
      this.barChartData = [{ data: this.minTempData, label: 'Min Temp' }, { data: this.maxTempData, label: 'Max Temp' }];
    });
  }
}
