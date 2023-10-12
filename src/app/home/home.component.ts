import { Component } from '@angular/core';
import { CardTempalting } from 'src/app/core/models/cardtemplating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Array that will contain cards informations for templating
  cards: Array<CardTempalting> = [
    {
      chartName: "testpie",
      chartType: "pie"
    },
    {
      chartName: "testcolumns",
      chartType: "column",
    }
  ]
}
