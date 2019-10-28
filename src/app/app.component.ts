import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  choice = 0;
  title = 'chart';

  line() {
    this.choice = 1;
  }

  bar() {
    this.choice = 2;
  }

  pie() {
    this.choice = 3;
  }
}
