import { Component, OnInit } from '@angular/core';
import { FormBase } from '../form-template/form-base';
import { DropdownField } from '../form-template/form-dropdown';
import { TextboxField } from '../form-template/form-textbox';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { formInterface } from '../dynamic-form/dynamic-form.component';
import { FileField } from '../form-template/form-file';
import { ActivatedRoute } from '@angular/router';
import { DatabaseopService } from '../services/databaseop.service';
import { AuthService } from '../services/auth.service';
import { RatingField } from '../form-template/form-rating';
import { TextAreaField } from '../form-template/form-textarea';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  questions$: Observable<FormBase<any>[]>;

  constructor(private as: AuthService, private route: ActivatedRoute, private db: DatabaseopService, private router: Router) {
    this.questions$ = this.getQuestions();
  }

  value: number = 0;

  formid: number = 0;
  user: any;
  uid:any;
  title: any;
  familymemid: any;
  doctorprofile: any;

  ngOnInit(): void {

    this.formid = this.route.snapshot.queryParams['id'];
    this.familymemid = this.route.snapshot.queryParams['fmid'];

    this.questions$ = this.getQuestions();

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.uid=res?.uid;
      // if(this.formid != 2){
      //   this.questions$ = this.getQuestions();
      // }
      // else{
      //   this.getdocprofile().snapshotChanges().subscribe((res: any) => {
      //     if(res){this.doctorprofile = res;}
      //     this.questions$ = this.getQuestions();
      //   });
      // }
    });
    // this.questions$ = this.getQuestions();
  }

  getQuestions() {

    let questions: FormBase<string>[] = [];
    if (this.formid == 0) {
      this.title = "bla1";
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
        }),
        new RatingField({
          key: 'rating',
          label: 'rating',
          value: '0',
          order: 5
        }),
        new TextAreaField({
          key: 'emailAddress',
          label: 'Email',
          type: 'email',
          order: 6
        }),
      ];
    }
    else if(this.formid == 1){
      this.title = "Add Family Member";
      questions = [
        new TextboxField({
          key: 'FamilyMemberName',
          label: 'Name of patient\'s family member',
          placeholder: 'Enter Family member\'s Name',
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'FamilyMemberAge',
          label: 'Family Member Age',
          placeholder: 'Enter age of family member',
          required: true,
          order: 2
        }),
        new TextboxField({
          key: 'Relation',
          label: 'Relation of Family Member',
          placeholder: 'Enter Family Member\'s Relation',
          required: true,
          order: 3
        }),
        new DropdownField({
          key: 'FamilyMemberGender',
          label: 'Gender',
          // value: 'Enter their gender',
          options: [
            {key: 'Female',  value: 'Female'},
            {key: 'Male',  value: 'Male'},
            {key: 'Other',   value: 'Other'}
          ],
          required: true,
          order: 4
        }),
        new TextboxField({
          key: 'FamilyMemberPhoneNumber',
          label: 'Family Member Phone Number',
          placeholder: 'Enter family member\'s number',
          type: 'number',
          required: true,
          order: 5
        }),
        new TextboxField({
          key: 'help',
          label: 'Help',
          placeholder: 'Enter Care takers name',
          order: 6
        })

      ]
    }
    else if(this.formid == 2){
      this.title = "Doctor Profile";
      questions = [
        new TextboxField({
          key: 'DoctorName',
          label: 'Doctor Name',
          placeholder: 'Enter Doctor\'s Name',
          // value: this.doctorprofile.payload.doc.data().DoctorName,
          required: true,
          order: 1
        }), 
        new TextboxField({
          key: 'DoctorSpecialization',
          label: 'Enter Doctor\'s Specialization',
          placeholder: 'Enter Doctor\'s Specialiazation',
          // value: this.doctorprofile.payload.doc.data().DoctorSpecialization,
          required: true,
          order: 2
        }),
        new TextboxField({
          key: 'DoctorDescription',
          label: 'Enter Doctor\'s Description',
          placeholder: 'Enter Doctor\'s Description/Introduction further',
          // value: this.doctorprofile.payload.doc.data().DoctorDescription,
          required: true,
          order: 3
        }),
        new TextboxField({
          key: 'DoctorFees',
          label: 'Fees Charged by Doctor',
          type: 'number',
          placeholder:"Enter doctor\'s fees",
          // value: this.doctorprofile.payload.doc.data().DoctorFees,
          required: true,
          order: 4
        }),
        new TextboxField({
          key: 'Tags',
          label: 'Tags (Degrees)',
          placeholder: 'Enter any tag\'s here',
          // value: this.doctorprofile.payload.doc.data().Tags,
          required: true,
          order: 5
        }),
        new DropdownField({
          key: 'Gender',
          label: 'Gender',
          options: [
            {key: 'Female',  value: 'Female'},
            {key: 'Male',  value: 'Male'},
            {key: 'Other',   value: 'Other'}
          ],
          required: true,
          order: 6
        }),
      ]
    }
    else if(this.formid == 3){
      this.title = "Medical History";
      questions = [
        new TextboxField({
          key: 'MedicalHistoryDate',
          label: 'Medical History Date',
          type:'date',
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'DoctorIncharge',
          label: 'Name of Doctor',
          placeholder: 'Name of Doctor Incharge',
          required: true,
          order: 2
        }),
        new FileField({
          key: 'MedicalReport',
          label: 'Medical Report File',
          type:'file',
          required: true,
          order: 3
        }),
      ]
    }
    else if(this.formid == 4){
      this.title = "Help History";
      questions = [
        new TextboxField({
          key: 'HelperName',
          label: 'Enter Helper Name',
          placeholder: 'Enter Helper Name',
          required: true,
          order: 1
        }), 
        new TextboxField({
          key: 'helperPhoneNumber',
          label: 'Phone Number',
          type: 'number',
          required: true,
          order: 2
        }),
        new TextboxField({
          key: 'HelperOrganisation',
          label: 'Organisation Name',
          placeholder: 'Enter Organisation Name',
          required: true,
          order: 3
        }),
        new DropdownField({
          key: 'Gender',
          label: 'Gender',
          options: [
            {key: 'Female',  value: 'Female'},
            {key: 'Male',  value: 'Male'},
            {key: 'Other',   value: 'Other'}
          ],
          required: true,
          order: 4
        }),
        new TextboxField({
          key: 'Age',
          label: 'Age',
          placeholder: 'Age',
          required: true,
          order: 5
        }),
        new FileField({
          key: 'HelperReport',
          label: 'Helper Identification Details Reports',
          type:'file',
          required: true,
          order: 6
        }),
      ]
    }
    else if(this.formid == 5){
      this.title = "Diet Plan History";
      questions = [
        new TextboxField({
          key: 'DietPlanBeginDate',
          label: 'Diet Plan Creation Date',
          type:'date',
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'dietPlanEndDate',
          label: 'Diet Plan Ending Date',
          type:'date',
          required: true,
          order: 2
        }),
        new TextboxField({
          key: 'DoctorInCharge',
          label: 'Doctor In Charge',
          placeholder: 'Name of the Doctor',
          required: true,
          order: 3
        }),
        new FileField({
          key: 'DietPlanReport',
          label: 'Any supporting Diet Plan Reports',
          type:'file',
          required: true,
          order: 4
        }),
      ]
    }
    else if(this.formid == 6){
      this.title = "Upload report - Doctor";
      questions = [
        new TextboxField({
          key: 'DoctorName',
          label: 'Enter Doctor Name',
          placeholder: 'Enter doctor\'s name',
          required: true,
          order: 1
        }), 
        new TextboxField({
          key: 'PatientName',
          label: 'Enter Patient Name',
          placeholder: 'Enter name of the patient',
          required: true,
          order: 2
        }), 
        new TextboxField({
          key: 'PatientPhoneNumber',
          label: 'Patient Phone Number',
          type: 'number',
          placeholder: 'Enter patient\'s phone number',
          required: true,
          order: 3
        }),
        new TextboxField({
          key: 'Familyemailid',
          label: 'PatientEmailID',
          placeholder: 'Enter patient\'s email id ',
          required: true,
          order: 4
        }),
        new FileField({
          key: 'supportingMedicalReport',
          label: 'Any supporting Patient Medical Reports',
          type:'file',
          required: true,
          order: 5
        }),
      ]
    }
    return of(questions?.sort((a, b) => a.order - b.order));
  }

  test(form1: formInterface) {
    // this.value += 1;
    console.log(form1.form.value, form1.file);
    this.db.create(`familymembers/${this.user.uid}/familymember`, form1.form.value);
  }

  submit(formdata: formInterface){
    if(this.formid == 1){
      this.db.create(`familymembers/${this.user.uid}/familymember`, formdata.form.value);
    }
    else if(this.formid == 2){
      let data = formdata.form.value;
      this.db.createdoc(`Doctors/${this.user.uid}`, data);
    }
    else if(this.formid == 3){
       let data = formdata.form.value;
       this.db.upload(`Medicalreport/${this.user.uid}/${this.familymemid}`, `MedicalReport/${this.user.uid}/MedicalReport/${this.familymemid}/medicalreports`, formdata.file, data).then(res => {
        this.router.navigate(['/history'], { queryParams: { id: 1, famid: this.familymemid } });
      });
    }
    else if(this.formid==4){
      let data = formdata.form.value;
      this.db.upload(`HelperDetails/${this.user.uid}/${this.familymemid}`, `HelperDetails/${this.user.uid}/HelperDetails/${this.familymemid}/helperdetails`, formdata.file, data).then(res => {
        this.router.navigate(['/history'], { queryParams: { id: 3, famid: this.familymemid } });
      });
    }
    else if(this.formid==5){
      let data = formdata.form.value;
      this.db.upload(`DietPlanDetails/${this.user.uid}/${this.familymemid}`, `DietPlanDetails/${this.user.uid}/DietPlanDetails/${this.familymemid}/DietPlanDetails`, formdata.file, data).then(res => {
        this.router.navigate(['/history'], { queryParams: { id: 2, famid: this.familymemid } });
      });
    }
    else if(this.formid==6){
      let data = formdata.form.value;
      this.db.upload(`DoctorPatientDetails/${this.user.uid}/${this.familymemid}`, `DoctorPatientDetails/${this.user.uid}/DoctorPatientDetails/${this.familymemid}/DoctorPatientDetails`, formdata.file, data);
    }
  }

  getdocprofile(){
    return this.db.readDoc(`Doctors/${this.uid}`);
  }
}
