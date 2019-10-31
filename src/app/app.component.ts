import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chart';

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
