import { Injectable } from '@angular/core';
import { InvestmentInterface } from 'src/app/core/models/chartsdata';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartdataService {
  constructor() {}

  // Temporary storage of datas in arrays, used to display them in the front
  private financialsData: Array<InvestmentInterface> = [];
  private estatesData: Array<InvestmentInterface> = [];

  // Subjects and observables that are used for observe changes when adding new datas.
  private _finSubject$ = new Subject<Array<InvestmentInterface>>();
  public financialsData$ = this._finSubject$.asObservable();

  private _estSubject$ = new Subject<Array<InvestmentInterface>>();
  public estatesData$ = this._estSubject$.asObservable();

  /**
   * @returns Name and amount of each financial investments in an array
   */
  public get financials(): Array<Array<string|number|Date>> {
    return this.financialsData.map(obj => {
      let { name, amount, date } = obj;
      return Object.values({ name, amount, date });
    });
  }

  /**
   * @returns Name and amount of each real estates investments in an array
   */
  public get estates(): Array<Array<string|number|Date>> {
    return this.estatesData.map(obj => {
      let { name, amount, date } = obj;
      return Object.values({ name, amount, date });
    });
  }
  
  /**
   * @returns Names of each real estates investments in an array
   */
  public get estatesName(): Array<string> {
    return this.estatesData.map(obj => obj.name);
  }

  /**
   * @returns Total invested in financial investments
   */
  public get totalFinancialsAmount(): number {
    return this.financialsData.reduce((total, obj) => total + obj.amount, 0);
  }
  /**
   * @returns Total invested in real estates investments
   */
  public get totalEstatesAmount(): number {
    return this.estatesData.reduce((total, obj) => total + obj.amount, 0);
  }

  /**
   * @returns Last invesments
   */
  public get getLastInvestments(): Array<Array<string|number|Date>> {
    const lastInvestments: Array<Array<string|number|Date>> = this.financials.concat(this.estates);
    lastInvestments.sort((a, b) =>  new Date(b[2]).getTime() - new Date(a[2]).getTime())
    return lastInvestments.slice(0, 5);
  }

  /**
   * Sets fetched datas from api to the financials array.
   */
  public set retrieveFinancialsData(arr: Array<InvestmentInterface>) {
    this.financialsData = arr;
    this._finSubject$.next(this.financialsData);
  }
  /**
   * Sets fetched datas from api to the real estates array.
   */
  public set retrieveEstatesData(arr: Array<InvestmentInterface>) {
    this.estatesData = arr;
    this._estSubject$.next(this.estatesData);
  }
}