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
    name: this.fb.control<string>('', Validators.required),
    amount: this.fb.control<number>(0, Validators.required),
    category: this.fb.control<string|undefined>(this.reason.extra, Validators.required),
    dateRange: this.fb.group({
      start: this.fb.control<Date|undefined>(undefined, Validators.required),
      end: this.fb.control<Date|undefined>(undefined, Validators.required)
    }),
    status: this.fb.control<string>('', Validators.required),
    roi: this.fb.control<number>(0, Validators.required),
    location: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>('', Validators.maxLength(255)),
  })

  public onSubmit() {
    let { name, amount, category, status, roi, location, description } = this.form.value;
    let stringifiedDate = this.form.value.dateRange.start.toISOString().slice(0, 19).replace('T', ' ');

    const formdata: InvestmentStringdateInterface = {
      name, amount, category, date: stringifiedDate, status, roi, location, description,
      duration: this.form.value.dateRange.end.getTime() - this.form.value.dateRange.start.getTime()
    };

    if (!description) formdata.description = 'undefined';
    console.log(formdata);

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
