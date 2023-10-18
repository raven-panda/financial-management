import { Component } from '@angular/core';
import { CardTempalting } from 'src/app/core/models/cardtemplating';
import { ChartdataService } from '../core/services/chartdata/chartdata.service';
import { BackfetchService } from '../core/services/backfetch/backfetch.service';
import { combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalboxComponent } from '../shared/components/modalbox/modalbox.component';
import { ModalCaseInterface } from '../core/models/switchform';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private cds: ChartdataService,
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
      chartName: "real-estates",
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
        const dialogData: ModalCaseInterface = {
          type: 'api-404'
        }
        this.modal.open(ModalboxComponent, {
          disableClose: true,
          data: {
            type: 'api-404'
          }
        });
      }
    })
  }

  /**
   * Reaffect the cards array with the retrieved values when datas are fetched from API
   */
  private loadDatas(): void {
    this.bfs.fetchData();
    combineLatest([this.cds.financialsData$, this.cds.estatesData$]).subscribe({
      next: () => {
        this.cards = [
          {
            chartName: "financial",
            chartType: "pie",
            chartData: this.cds.financials,
            total: this.cds.totalFinancialsAmount
          },
          {
            chartName: "real-estates",
            chartType: "column",
            chartData: this.cds.estates,
            chartXaxis: this.cds.estatesName,
            chartYaxis: 'Amount',
            total: 0
          }
        ]
      }
    })
  }

  public addInvestment(name: string) {
    console.log(name);
    const dialogData: ModalCaseInterface = {
      type: 'addinvestment',
      extra: name
    }
    this.modal.open(ModalboxComponent, {
      data: dialogData
    }).afterClosed().subscribe({
      next: () => this.bfs.fetchData()
    })
  } 
}
