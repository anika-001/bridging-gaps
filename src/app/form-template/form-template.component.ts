import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from './form-base';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  constructor() { }

  value: any = null;

  ngOnInit(): void {
    console.log(this.question.options)
  }
  @Input() question!: FormBase<string>;
  @Input() form!: FormGroup;
  get isValid() { 
    if (this.question.controlType == "dropdown"){
      this.form.get(this.question.key)?.setValue(this.value);
    }
    return this.form.controls[this.question.key].valid; }

}
