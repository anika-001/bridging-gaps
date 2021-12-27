import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from './form-base';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(questions: FormBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      if (question.controlType != 'file'){
        group[question.key] = question.required ? new FormControl('', Validators.required)
                                              : new FormControl(question.value || '');
      };
    });
    return new FormGroup(group);
  }


}
