import { Injectable } from '@angular/core';
import { InvestmentInterface } from 'src/app/core/models/chartsdata';

@Injectable({
  providedIn: 'root'
})
export class InvestsdataService {
  constructor() { }

  private financialsData: Array<InvestmentInterface> = [
    {
      name: 'Livret A',
      amount: 812
    },
    {
      name: 'Compte courant',
      amount: 2001
    },
    {
      name: 'Autres',
      amount: 124
    }
  ];
  private estatesData: Array<InvestmentInterface> = [
    {
      name: 'Résidence principale',
      amount: 448752
    },
    {
      name: 'Moulin ouest',
      amount: 202331
    },
    {
      name: 'Maison de vacances',
      amount: 45000
    }
  ];

  public get financials(): Array<Array<string|number>> {
    return this.financialsData.map(obj => Object.values(obj));
  }

  public get estates(): Array<Array<string|number>> {
    return this.estatesData.map(obj => Object.values(obj));
  }
  
  public get estatesName(): Array<string> {
    return this.estatesData.map(obj => obj.name);
  }

  public get totalFinancialsAmount(): number {
    return this.financialsData.reduce((total, obj) => total + obj.amount, 0);
  }
  public get totalEstatesAmount(): number {
    return this.estatesData.reduce((total, obj) => total + obj.amount, 0);
  }
}
