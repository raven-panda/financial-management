import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InvestmentInterface, InvestmentStringdateInterface } from 'src/app/core/models/chartsdata';
import { ChartdataService } from 'src/app/core/services/chartdata/chartdata.service';
import { ApiEndpoints } from 'src/app/core/classes/apiendpoints/apiendpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackfetchService {
  constructor(private http: HttpClient,
              private ids: ChartdataService) { }

  /**
   * It returned observable will be used to check if the API is available.
   * @returns Observable of the http request to the api
   */
  public checkApiConnection(): Observable<Object> {
    return this.http.get(ApiEndpoints.api);
  }

  /**
   * Fetch and set datas of the financials/estates investments to the temporary storing in the investsdata service.
   */
  public fetchData(): void {
    this.http.get(ApiEndpoints.financials)
    .subscribe({
      next: (data: any) => {
        let typedData: Array<InvestmentInterface> = [];
        
        data.forEach((obj: InvestmentInterface) => {
          let {id, name, amount} = obj;
          obj = {
            id, name, amount, date : new Date(obj.date)
          }
          typedData.push(obj);
        });
        
        this.ids.retrieveFinancialsData = typedData;
      },
      error: (res: HttpErrorResponse) => {
        return res.status;
      }
    });
    this.http.get(ApiEndpoints.estates)
    .subscribe({
      next: (data: any) => {
        let typedData: Array<InvestmentInterface> = [];
        
        data.forEach((obj: InvestmentInterface) => {
          let {id, name, amount} = obj;
          obj = {
            id, name, amount, date : new Date(obj.date)
          }
          typedData.push(obj);
        });

        this.ids.retrieveEstatesData = typedData;
      },
      error: (res: HttpErrorResponse) => {
        return res.status;
      }
    });
  }
}