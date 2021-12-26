import { Component, OnInit } from '@angular/core';
import { FormBase } from '../form-template/form-base';
import { DropdownField } from '../form-template/form-dropdown';
import { TextboxField } from '../form-template/form-textbox';

import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { formInterface } from '../dynamic-form/dynamic-form.component';
import { FileField } from '../form-template/form-file';
import { ActivatedRoute } from '@angular/router';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  questions$: Observable<FormBase<any>[]>;

  constructor(private route: ActivatedRoute, private db: DatabaseopService) {
    this.questions$ = this.getQuestions();
  }

  value: number = 0;

  formid: number = 0;

  ngOnInit(): void {
    this.formid = this.route.snapshot.queryParams['id'];
    console.log(this.formid);
    this.questions$ = this.getQuestions();
    // this.questions$ = this.getQuestions();
  }

  getQuestions() {

    let questions: FormBase<string>[] = [];
    if (this.formid == 1) {
      questions = [
        new DropdownField({
          key: 'brave',
          label: 'Bravery Rating',
          options: [
            {key: 'solid',  value: 'Solid'},
            {key: 'great',  value: 'Great'},
            {key: 'good',   value: 'Good'},
            {key: 'unproven', value: 'Unproven'}
          ],
          order: 3
        }),

        new TextboxField({
          key: 'firstName',
          label: 'First name',
          value: 'Bombasto',
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'emailAddress',
          label: 'Email',
          type: 'email',
          order: 2
        }),
        new FileField({
          key: 'File',
          label: 'File',
          value: 'file',
          order: 4
        })
      ];
    }
    return of(questions?.sort((a, b) => a.order - b.order));
  }

  test(form1: formInterface) {
    // this.value += 1;
    console.log(form1.form.value, form1.file);
    this.db.create("Test", form1.form.value);

  }

}
