import { Injectable } from '@angular/core';
import { InvestmentStringdateInterface } from 'src/app/core/models/chartsdata';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from 'src/app/core/classes/apiendpoints/apiendpoints';
import { BackfetchService } from 'src/app/core/services/backfetch/backfetch.service';
import { RequestResInterface } from '../../models/requestresponse';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestActionService {
  constructor(private http: HttpClient, private bfs: BackfetchService) {}

  /**
   * A simple **switch** that returns the **endpoint** to query using the given **string** as code.
   * @param category Category of the **changes**.
   * @returns The **endpoint** to query.
   */
  private switchApiEndpoint(category: string) {
    switch (category) {
      case 'Financial':
        return ApiEndpoints.financials;
      case 'Real Estates':
        return ApiEndpoints.estates;
      default:
        return '';
    }
  }

  /**
   * Makes a **post** request to the API. The called switch determine where to **post** with the `category` property of `formdata`.
   * @param formdata Form group values to **post**.
   * @returns **Observable** to **manage errors** in the form component.
   */
  public postRequest(formdata: InvestmentStringdateInterface) {
    const apiEndpoint = this.switchApiEndpoint(formdata.category);
    return this.http.post(apiEndpoint, formdata).pipe(
      map(res => {
        return res as RequestResInterface;
      })
    );
  }  
}