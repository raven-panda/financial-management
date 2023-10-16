import { Component } from '@angular/core';
import { CardTempalting } from 'src/app/core/models/cardtemplating';
import { InvestsdataService } from '../core/services/investsdata/investsdata.service';
import { BackfetchService } from '../core/services/backfetch/backfetch.service';
import { combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalboxComponent } from '../shared/components/modalbox/modalbox.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private ids: InvestsdataService,
              private bfs: BackfetchService,
              private modal: MatDialog){}
  // Array that will contain cards informations for templating
  cards: Array<CardTempalting> = [
    {
      chartName: 'financial',
      chartType: "pie",
      chartData: [],
      total: 0
    },
    {
      chartName: "real estates",
      chartType: "column",
      chartData: [],
      chartYaxis: 'Amount',
      total: 0
    }
  ]

  /**
   * Check on init if the API is available, and display dialog box if not.
   */
  private ngOnInit(): void {
    this.bfs.checkApiConnection().subscribe({
      next: () => {
        this.loadDatas();
      },
      error: (res: HttpErrorResponse) => {
        console.error(res);
        this.modal.open(ModalboxComponent, {
          disableClose: true,
          data: 'api-404'
        });
      }
    })
  }

  /**
   * Reaffect the cards array with the retrieved values when datas are fetched from API
   */
  private loadDatas(): void {
    this.bfs.fetchData();
    combineLatest([this.ids.financialsData$, this.ids.estatesData$]).subscribe({
      next: () => {
        this.cards = [
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
            total: 0
          }
        ]
      }
    })
  }
}
