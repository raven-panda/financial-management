import { Component } from '@angular/core';
import { TableTemplating } from '../core/models/cardtemplating';
import { ChartdataService } from '../core/services/chartdata/chartdata.service';
import { BackfetchService } from '../core/services/backfetch/backfetch.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCaseInterface } from '../core/models/switchform';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalboxComponent } from '../shared/components/modalbox/modalbox.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent {

  constructor(private cds: ChartdataService,
    private bfs: BackfetchService,
    private modal: MatDialog){}

  public investmentsStatusTable: TableTemplating = {
    head: ['Investment status', 'Total amount'],
    core: []
  }

  public investmentsRoiTable: TableTemplating = {
    head: ['Investment', 'Amount invested', 'Return on investment'],
    core: []
  }

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

  private loadDatas(): void {
    this.bfs.fetchData();
    combineLatest([this.cds.financialsData$, this.cds.estatesData$]).subscribe({
      next: () => {
        this.investmentsStatusTable.core = this.cds.financialsStatus;
        this.investmentsRoiTable.core = this.cds.financialsAndRoi;
      }
    })
  }
}
