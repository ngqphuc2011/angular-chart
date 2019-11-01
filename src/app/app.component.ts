import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chart';
  @ViewChild(ChartComponent, { static: true }) chart: ChartComponent;

  apiUrlValue = '';
  chartTypeValue = '';
  isClick = false;

  getInfo(apiUrl: string, chartType: string) {
    this.isClick = true;
    this.apiUrlValue = apiUrl;
    this.chartTypeValue = chartType;
    // console.log(this.apiUrl + ' ' + this.chartType);
  }

}
