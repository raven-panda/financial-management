import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input({required: true}) name: string = '';
  @Input({required: true}) arrayData: Array<Array<string|number|Date>> = [];
}
