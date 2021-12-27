import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  currentRating: number = 0;

  ngOnInit(): void {
    console.log(this.question.options)
  }
  @Input() question!: FormBase<string>;
  @Input() form!: FormGroup;

  @Output() newFileEvent = new EventEmitter<FileList>();

  get isValid() { 
    
    return this.form.controls[this.question.key].valid; 
  }

  emitFiles(event: any){
    this.newFileEvent.emit(event.target["files"]);
  }

  addtoform(event: any){
    if (this.question.controlType == "dropdown"){
      this.form.get(this.question.key)?.setValue(this.value);
    }

    if (this.question.controlType == "rating"){
      this.form.get(this.question.key)?.setValue(this.currentRating);
    }
    console.log(this.form.value, this.currentRating);
  }
}
