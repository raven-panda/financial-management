import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCaseInterface } from 'src/app/core/models/switchform';

@Component({
  selector: 'app-modalbox',
  templateUrl: './modalbox.component.html',
  styleUrls: ['./modalbox.component.scss']
})
export class ModalboxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: ModalCaseInterface) {}
  public reason: ModalCaseInterface = this.dialogData;
}
