import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvestmentStringdateInterface } from 'src/app/core/models/chartsdata';
import { RequestResInterface } from 'src/app/core/models/requestresponse';
import { ModalCaseInterface } from 'src/app/core/models/switchform';
import { InvestActionService } from 'src/app/core/services/investaction/investaction.service';

@Component({
  selector: 'app-modalbox',
  templateUrl: './modalbox.component.html',
  styleUrls: ['./modalbox.component.scss']
})
export class ModalboxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: ModalCaseInterface, private dialRef: MatDialogRef<ModalboxComponent>, private fb: FormBuilder, private ias: InvestActionService) {}
  public reason: ModalCaseInterface = this.dialogData;

  public form: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    amount: this.fb.control('', Validators.required),
    category: this.fb.control(this.reason.extra, Validators.required),
    date: this.fb.control('', Validators.compose([Validators.required]))
  })

  public onSubmit() {
    let {name, amount, category} = this.form.value;
    const formdata: InvestmentStringdateInterface = {
      name, amount, category, date: this.form.controls['date'].value.toISOString().slice(0, 19).replace('T', ' ')
    };

    this.ias.postRequest(formdata).subscribe({
      next: (res: RequestResInterface) => {
        if (res.code !== '1') {
          if (res.code === '202') {
            this.form.controls['name'].setErrors({'already-exists' : true});
          } else {
            console.error(res);
          }
        } else {
          this.dialRef.close();
        }
      }
    })
  }
}
