import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  @Input({required: true}) title: string|undefined = undefined;
  @Input({required: true}) type: "pie"|"column" = "pie";
  
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';

  chartOptions: Highcharts.Options = {}

  ngOnChanges() {
    this.chartOptions = {
      title: {
        text: this.title,
      },
      series: [{
        type: this.type,
        data: [
          ['Compte courant', 70],
          ['Livret A', 20],
          ['Autres', 10]
        ]
      }]
    }
  }

}