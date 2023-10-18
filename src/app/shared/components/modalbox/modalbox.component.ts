import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCaseInterface } from 'src/app/core/models/switchform';

@Component({
  selector: 'app-modalbox',
  templateUrl: './modalbox.component.html',
  styleUrls: ['./modalbox.component.scss']
})
export class ModalboxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: ModalCaseInterface, private fb: FormBuilder) {}
  public reason: ModalCaseInterface = this.dialogData;

  public form: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    amount: this.fb.control('', Validators.required)
  })

  public onSubmit() {
    
  }
}
