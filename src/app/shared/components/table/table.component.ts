import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input({required: true}) name: string = '';
  @Input({required: true}) head: string[] = [];
  @Input() arrayData: Array<Array<string|number|Date>> = [];
  @Input() core: any[] = [];

  public isDate(item: any): boolean {
    return item instanceof Date;
  }

  public isInteger(item: any): boolean {
    return Number.isInteger(item);
  }
}
