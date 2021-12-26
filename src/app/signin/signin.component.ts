import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  FormControl,  FormGroup,  Validators,  AbstractControl,} from '@angular/forms';
import { Router } from '@angular/router';
import { logindata, regdata } from '../JSONdata/signin';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  errormessage: any;

  constructor(private as: AuthService, private router: Router) {}

  login: boolean = true;
  error: string = '';
  // windowRef: any;
  selectedrole: any;
  signindata: any;
  signupdata: any;
  // phoneno: boolean = false;
  // signindataphoneno: any;
  // signindataemail: any;
  // auth:any;

  // app = initializeApp(environment.firebaseConfig);
  // firebase.initilizeApp(this.config);
  // this.windowRef = this.win.windowRef;

  // initializeApp(environment.firebaseConfig)

  // phone() {
  //   this.phoneno = !this.phoneno;
  //   if (this.phoneno == true) {
  //     this.signindata = this.signindataphoneno;
  //     // document.querySelector("#recaptcha-container").style.display = "none";
  //   }

  //   else {
  //     // this.windowRef.recaptchaVerifier.clear();
  //     this.signindata = this.signindataemail;
  //   }
  // }

  move() {
    this.login = !this.login;
    // this.error = false;
  }

  submit() {
    if (this.login) {
      if (!this.formlogin.invalid) {
        console.log(this.formlogin.value);
        this.as
          .login(this.formlogin.value)
          .then((res) => {
            this.router.navigate(['/home']);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('invalid login');
        this.error = 'Please fill all fields correctly.';
      }
    } else {
      if (!this.formreg.invalid) {
        this.as
          .signup(this.formreg.value)
          .then((res) => {
            this.login = true;
          })
          .catch((err) => {
            this.error = err.message;
          });
      }
      else{
        console.log('invalid signup');
        this.error = 'Please fill all fields correctly.';
      }
    }
    // else {
    //   // this.formreg.get("role")?.setValue(this.signupdata[5].value);
    //   let data = this.formreg.value;
    //   data['role'] = this.signupdata[5].value;
    //   this.as.signup(data).then((res) => {});
    // }
  }

  // isdisabled(){
  //   if(this.login){
  //     if (this.formlogin.get('email')!.invalid) {
  //       return true;
  //     }
  //   }

  //   else{
  //     if(this.formreg.invalid){
  //       return true;
  //     }
  //   }
  // }

  formlogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      ),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  formreg = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
        ),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[2-9]{2}\\d{8}'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        ),
      ]),
      // role: new FormControl('user'),
      confirmpassword: new FormControl('', [Validators.required]),
    },
    { validators: this.checkPasswords }
  );

  ngOnInit(): void {
    console.log(this.formreg.value);
    console.log(this.formlogin.value);
    this.signindata = logindata;
    this.signupdata = regdata;
    // this.formreg.setValidators(this.checkPasswords);
    
  }

  formlog(name: string) {
    return this.formlogin.get(name)!;
  }
  formregget(name: string) {
    return this.formreg.get(name)!;
  }

  // get emaillog() { return this.formlogin.get('email')!; }
  // get phonelog() { return this.formreg.get('phone')!; }
  // get emailreg() { return this.formreg.get('email')!; }
  // get password() { return this.formreg.get('password')!; }
  // get passwordlogin() { return this.formlogin.get('password')!; }
  // get confirmp() { return this.formreg.get('confirmpassword')!; }
  // get getname() {  }

  checkPasswords(group: AbstractControl) {
    // here we have the 'passwords' group
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmpassword')?.value;

    console.log(pass, confirmPass, pass == confirmPass);
    return pass === confirmPass ? null : { notSame: true };
  }

  // forgot() {
  //   if (this.formlogin.get('email')!.invalid) {
  //     return;
  //   }
  //   this.as.forgot(this.formlogin.get('email').value);
  // }
}
