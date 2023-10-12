import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  // Setting up Inputs for passing data through HTML attributes
  @Input({required: true}) title: string|undefined = undefined;
  @Input({required: true}) type: "pie"|"column" = "pie";
  @Input({required: true}) name: string = "";
  
  // Declaring properties for chart construction
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {}

  ngOnChanges() {
    // Affectation of the chart options after changes passed by Inputs decorator
    this.chartOptions = {
      title: {
        text: this.title,
      },
      series: [{
        type: this.type,
        name: this.name,
        data: [
          ['Compte courant', 70],
          ['Livret A', 20],
          ['Autres', 10]
        ]
      }]
    }
  }

}