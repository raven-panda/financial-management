import { Component } from '@angular/core';
import { CardTempalting, TableTemplating } from 'src/app/core/models/cardtemplating';
import { ChartdataService } from '../core/services/chartdata/chartdata.service';
import { BackfetchService } from '../core/services/backfetch/backfetch.service';
import { combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalboxComponent } from '../shared/components/modalbox/modalbox.component';
import { ModalCaseInterface } from '../core/models/switchform';
import { InvestmentInterface } from '../core/models/chartsdata';

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
  public cards: Array<CardTempalting> = [
    {
      chartName: 'financial',
      chartType: "pie",
      chartData: [],
      total: 0,
      routerLink: '/finances',
    },
    {
      chartName: "Real Estates",
      chartType: "column",
      chartData: [],
      chartYaxis: 'Amount',
      total: 0,
      routerLink: '/real-estates',
    }
  ]

  public tableParam: TableTemplating = {
    head: ['Name', 'Amount', 'Date'],
    core: []
  }

  public lastInvestments: Array<Array<string|number|Date>> = [];
  public totalLastInvesments: number = 0;

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
          data: dialogData
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
        this.lastInvestments = this.cds.getLastInvestments;
        this.lastInvestments.forEach(arr => this.totalLastInvesments += Number(arr[1]));
        this.cards = [
          {
            chartName: "Financial",
            chartType: "pie",
            chartData: this.cds.financials,
            total: this.cds.totalFinancialsAmount,
            routerLink: '/finances'
          },
          {
            chartName: "Real Estates",
            chartType: "column",
            chartData: this.cds.estates,
            chartXaxis: this.cds.estatesName,
            chartYaxis: 'Amount',
            total: this.cds.totalEstatesAmount,
            routerLink: ''
          }
        ]
      }
    })
  }

  public addInvestment(name: string) {
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
