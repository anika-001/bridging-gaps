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
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { updateLanguageServiceSourceFile } from 'typescript';

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
  docid: number = 0;
  formid: number = 0;
  user: any;
  uid: any;
  title: any;
  familymemid: any;
  doctorprofile: any;
  uemail: any;

  ngOnInit( ): void {

    this.formid = this.route.snapshot.queryParams['id'];
    this.familymemid = this.route.snapshot.queryParams['fmid'];
    this.docid = this.route.snapshot.queryParams['docid'];
    this.questions$ = this.getQuestions();

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.uid = res?.uid;
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        this.uemail = res.payload.data().email;
        // if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
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
            { key: 'solid', value: 'Solid' },
            { key: 'great', value: 'Great' },
            { key: 'good', value: 'Good' },
            { key: 'unproven', value: 'Unproven' }
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
    else if (this.formid == 1) {
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
          order: 2,
          type: 'number'

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
            { key: 'Female', value: 'Female' },
            { key: 'Male', value: 'Male' },
            { key: 'Other', value: 'Other' }
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
    else if (this.formid == 2) {
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
          placeholder: "Enter doctor\'s fees",
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
    else if (this.formid == 3) {
      this.title = "Add Medical a Report";
      questions = [
        new TextboxField({
          key: 'MedicalHistoryDate',
          label: 'Apointment Date',
          type: 'date',
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
          type: 'file',
          required: true,
          order: 3
        }),
      ]
    }
    else if (this.formid == 4) {
      this.title = "Add a Caretaker";
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
            { key: 'Female', value: 'Female' },
            { key: 'Male', value: 'Male' },
            { key: 'Other', value: 'Other' }
          ],
          required: true,
          order: 4
        }),
        new FileField({
          key: 'HelperReport',
          label: 'Helper Identification Details Reports',
          type: 'file',
          required: true,
          order: 6
        }),
        new TextboxField({
          key: 'Age',
          label: 'Age',
          placeholder: 'Age',
          required: true,
          order: 5
        }),
       
      ]
    }
    else if (this.formid == 5) {
      this.title = "Add a Diet Plan";
      questions = [
        new TextboxField({
          key: 'DietPlanBeginDate',
          label: 'Diet Plan Creation Date',
          type: 'date',
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'dietPlanEndDate',
          label: 'Diet Plan Ending Date',
          type: 'date',
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
          type: 'file',
          required: true,
          order: 4
        }),
      ]
    }
    else if (this.formid == 6) {
      this.title = "Upload report - Doctor";
      questions = [
        new TextboxField({
          key: 'DoctorIncharge',
          label: 'Enter Doctor Name',
          placeholder: 'Enter doctor\'s name',
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'PatientPhoneNumber',
          label: 'Patient Phone Number',
          type: 'number',
          placeholder: 'Enter patient\'s phone number',
          required: true,
          order: 2
        }),
        new TextboxField({
          key: 'Familyemailid',
          label: 'Patient Email ID',
          placeholder: 'Enter patient\'s email id ',
          required: true,
          order: 3
        }),

        new TextboxField({
          key: 'MedicalHistoryDate',
          label: 'Apointment Date',
          type: 'date',
          required: true,
          order: 4
        }),
        new FileField({
          key: 'supportingMedicalReport',
          label: 'Any supporting Patient Medical Reports',
          type: 'file',
          required: true,
          order: 5
        }),
        

      ]
    }
    else if (this.formid == 7) {
      this.title = "Helper Profile";
      questions = [
        new TextboxField({
          key: 'HelperName',
          label: 'Helper Name',
          placeholder: 'Enter helper\'s Name',
          // value: this.doctorprofile.payload.doc.data().DoctorName,
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'HelperOrganisation',
          label: 'Enter Helper\'s Organisation',
          placeholder: 'Enter Helper\'s organisation',
          // value: this.doctorprofile.payload.doc.data().DoctorSpecialization,
          required: true,
          order: 2
        }),
        new TextboxField({
          key: 'HelperDescription',
          label: 'Enter helper\'s Description',
          placeholder: 'Enter Helper\'s Description/Introduction further',
          // value: this.doctorprofile.payload.doc.data().DoctorDescription,
          required: true,
          order: 3
        }),
        new TextboxField({
          key: 'HelperPhoneNumber',
          label: 'Helper Phone Number',
          type: 'number',
          placeholder: "Enter helper\'s phone number",
          // value: this.doctorprofile.payload.doc.data().DoctorFees,
          required: true,
          order: 4
        }),
        new TextboxField({
          key: 'HelperAge',
          label: 'Helper Age',
          type: 'number',
          placeholder: "Enter helper\'s age",
          // value: this.doctorprofile.payload.doc.data().DoctorFees,
          required: true,
          order: 5,

        }),
        new DropdownField({
          key: 'Gender',
          label: 'Gender',
          options: [
            { key: 'Female', value: 'Female' },
            { key: 'Male', value: 'Male' },
            { key: 'Other', value: 'Other' }
          ],
          required: true,
          order: 6
        }),
        new TextboxField({
          key: 'HelperLocation',
          label: 'Enter Helper\'s Location',
          placeholder: 'Enter Helper\'s location',
          // value: this.doctorprofile.payload.doc.data().DoctorDescription,
          required: true,
          order: 7
        }),
      ]
    }
    else if (this.formid == 8) {
      this.title = "Add a Reviews";
      questions = [
        new RatingField({
          key: 'ReviewRating',
          label: 'Review Rating',
          placeholder: 'Enter Review Rating out of 5',
          type:'number',
          // value: this.doctorprofile.payload.doc.data().DoctorName,
          required: true,
          order: 1
        }),
        new TextboxField({
          key: 'ReviewComment',
          label: 'Review Comment',
          placeholder: 'Enter your Review',
          // value: this.doctorprofile.payload.doc.data().DoctorSpecialization,
          required: true,
          order: 2
        }),
      ]
    }
    else if(this.formid == 9){
      this.title = "Reminder";
      questions = [
        new TextboxField({
          key: 'MedicineName',
          label: 'Medicine Name',
          placeholder: 'Enter the name of medicine',
          // type:'number',
          // value: this.doctorprofile.payload.doc.data().DoctorName,
          required: true,
          order: 1
        }), 
        new TextboxField({
          key: 'Time',
          label: 'Reminder Time',
          placeholder: 'Enter the time to remind (HH:MM - in 24hr Format)',
          // value: this.doctorprofile.payload.doc.data().DoctorSpecialization,
          required: true,
          order: 2
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

  submit(formdata: formInterface) {
    if (this.formid == 1) {
      let data = formdata.form.value;
      this.db.create(`familymembers/${this.user.uid}/familymember`, data).then((res: any) => {
        console.log(res);
        this.db.create(`PhoneNumbers`, {"phno": data["FamilyMemberPhoneNumber"], "user": this.user.uid, "familymemid": res.id})
      });
    }
    else if (this.formid == 2) {
      let data = formdata.form.value;
      data["Rating"] = 0;
      this.db.createdoc(`Doctors/${this.user.uid}`, data);
    }
    else if (this.formid == 3) {
      let data = formdata.form.value;
      this.db.upload(`Medicalreport/${this.user.uid}/${this.familymemid}`, `MedicalReport/${this.user.uid}/MedicalReport/${this.familymemid}/medicalreports`, formdata.file, data).then(res => {
        this.router.navigate(['/history'], { queryParams: { id: 1, famid: this.familymemid } });
      });
    }
    else if (this.formid == 4) {
      let data = formdata.form.value;
      this.db.upload(`HelperDetails/${this.user.uid}/${this.familymemid}`, `HelperDetails/${this.user.uid}/HelperDetails/${this.familymemid}/helperdetails`, formdata.file, data).then(res => {
        this.router.navigate(['/history'], { queryParams: { id: 3, famid: this.familymemid } });
      });
    }
    else if (this.formid == 5) {
      let data = formdata.form.value;
      this.db.upload(`DietPlanDetails/${this.user.uid}/${this.familymemid}`, `DietPlanDetails/${this.user.uid}/DietPlanDetails/${this.familymemid}/DietPlanDetails`, formdata.file, data).then(res => {
        this.router.navigate(['/history'], { queryParams: { id: 2, famid: this.familymemid } });
      });
    }
    else if (this.formid == 6) {
      let data = formdata.form.value;
      this.db.readCollection(`Users`).snapshotChanges().subscribe((res: any) => {
        for (let i of res ){
          if (i.payload.doc.data().email ==data["Familyemailid"] ){
          this.db.readCollection(`familymembers/${i.payload.doc.id}/familymember`).snapshotChanges().subscribe((res1: any)=>{
            for (let j of res1){
              if (j.payload.doc.data().FamilyMemberPhoneNumber ==data["PatientPhoneNumber"]){
               delete data["PatientPhoneNumber"] ; delete data["Familyemailid"];
                this.db.upload(`Medicalreport/${i.payload.doc.id}/${j.payload.doc.id}`, `MedicalReport/${i.payload.doc.id}/MedicalReport/${j.payload.doc.id}/medicalreports`, formdata.file, data)
              }
            }
          })
          }
        }
      })
    }
    else if (this.formid == 7) {
      this.db.create(`Caretakers/`, formdata.form.value);
    }
    else if(this.formid == 8){
      this.db.create(`Reviewscomment/${this.docid}/comments`, {"uid":this.user.uid,"reviewcomment":formdata.form.value["ReviewComment"], "reviewrating":formdata.form.value["ReviewRating"], "useremail": this.uemail});
      this.db.createdoc(`Reviewsrating/${this.docid}/ratings/${this.user.uid}`, {"uid":this.user.uid,"reviewrating":formdata.form.value["ReviewRating"]})
      .then(res=>{
        this.db.readCollection(`Reviewsrating/${this.docid}/ratings`).snapshotChanges().subscribe((res:any) => {
          console.log("here")
          let avg=0;
          for(let i of res){
            avg = avg + Number(i.payload.doc.data().reviewrating);
          }
          console.log(avg);
          console.log(avg/res.length);
          this.db.update(`Doctors/${this.docid}`,{"Rating":avg});
        })
      });
    }
    else if(this.formid==9){
      let data = formdata.form.value;
      data["uid"]= this.user.uid;
      this.db.create(`Reminders/${this.user.uid}/Reminders/${this.familymemid}/reminders`, data).then(res => {
        this.db.readDoc(`familymembers/${this.user.uid}/familymember/${this.familymemid}`).snapshotChanges().subscribe((res: any) => {
          data["fmid"] = this.familymemid;
          data["phno"] = res.payload.data().FamilyMemberPhoneNumber;
          this.db.create(`TriggerReminders`, data).then(res => {
            this.router.navigate(['/reminders'], { queryParams: { famid: this.familymemid,}});
          });
        })
      });
    }
  }

  getdocprofile() {
    return this.db.readDoc(`Doctors/${this.uid}`);
  }
}
