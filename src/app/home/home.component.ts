import { Component } from '@angular/core';
import { CardTempalting } from 'src/app/core/models/cardtemplating';
import { InvestsdataService } from '../core/services/investsdata/investsdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private ids: InvestsdataService){
    this.ids.estatesName;
  }
  // Array that will contain cards informations for templating
  cards: Array<CardTempalting> = [
    {
      chartName: "fiancial",
      chartType: "pie",
      chartData: this.ids.financials,
      total: this.ids.totalFinancialsAmount
    },
    {
      chartName: "real estates",
      chartType: "column",
      chartData: this.ids.estates,
      chartXaxis: this.ids.estatesName,
      chartYaxis: 'Amount',
      total: this.ids.totalEstatesAmount
    }
  ]
}
