import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InvestmentInterface } from '../../models/chartsdata';
import { ChartdataService } from '../chartdata/chartdata.service';
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
        let typedData: Array<InvestmentInterface> = data;
        this.ids.retrieveFinancialsData = typedData;
      },
      error: (res: HttpErrorResponse) => {
        return res.status;
      }
    });
    this.http.get(ApiEndpoints.estates)
    .subscribe({
      next: (data: any) => {
        let typedData: Array<InvestmentInterface> = data;
        this.ids.retrieveEstatesData = typedData;
      },
      error: (res: HttpErrorResponse) => {
        return res.status;
      }
    });
  }
}

/**
 * All API endpoints with domain as private property
 */
class ApiEndpoints {
  private static readonly domain = 'http://localhost';
  
  public static readonly api: string = this.domain + '/api';
  public static readonly financials: string = this.domain + '/api/financials';
  public static readonly estates: string = this.domain + '/api/estates';
}