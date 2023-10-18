import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  // Setting up Inputs for passing data through HTML attributes
  @Input({required: true}) type: "pie"|"column" = "pie";
  @Input({required: true}) name: string = "";
  @Input({required: true}) data: Array<Array<string|number|Date>> = [];
  @Input() xaxis: Array<string>|false = [];
  @Input() yaxis: string|false = '';
  
  // Declaring properties for chart construction
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {}

  ngOnChanges() {
    // Affectation of the chart options after changes passed by Inputs decorator
    this.chartOptions = {
      series: [
        {
          type: this.type,
          name: this.name,
          data: this.data
        }
      ],
      title: {
        text: undefined
      }
    }

    if (this.xaxis) {
      this.chartOptions.xAxis = {
        categories: this.xaxis
      };
    }
    if (this.yaxis) {
      this.chartOptions.yAxis = {
        title: {
          text: this.yaxis
        }
      };
    }
  }

}