import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBase } from '../form-template/form-base';
import { FormControlService } from '../form-template/form-control.service';

export interface formInterface{
  form: FormGroup,
  file: FileList | null
}


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent implements OnInit {

  @Input() questions: FormBase<string>[] | null = [];
  form!: FormGroup;

  @Output() newFormEvent = new EventEmitter<formInterface>();

  files: any = null;

  payLoad = '';

  constructor(private qcs: FormControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as FormBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    let response: formInterface = {'form': this.form, 'file': null};
    if(this.files != null){
      response.file = this.files 
    }
    // this.form.reset();
    this.newFormEvent.emit(response);
    this.form.reset();
  }

  fileEvent(file: any){
    this.files = file;
  }
}
