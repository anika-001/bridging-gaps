import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { logindata, regdata } from '../JSONdata/signin';
import { AuthService } from '../services/auth.service';


// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { forbiddenNameValidator } from '../Validators/forbidden-name';
// import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
// import { WindowService } from '../services/window.service';
// import { initializeApp } from 'firebase/app';
// import { environment } from 'src/environments/environment';
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// import 'firebase/auth';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
errormessage:any;

  constructor(private as: AuthService, private router: Router) { }
  
  login: boolean = true;
  error: any;
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
  }

  submit() {
    if(this.login){
      console.log(this.formlogin.value);
      this.as.login(this.formlogin.value).then(res => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err)
      })
    }
    else{
      // this.formreg.get("role")?.setValue(this.signupdata[5].value);
      
      this.as.signup(this.formreg.value).then(res => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  formlogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  formreg = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    // role: new FormControl('user'),
    confirmpassword: new FormControl(''),
  })
  
  ngOnInit(): void {
    console.log(this.formreg.value)
    console.log(this.formlogin.value)
    // firebase.initializeApp(this.config);
    
    // this.auth= getAuth();
    // this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
    // this.windowRef.recaptchaVerifier.render();
    
    this.signindata = logindata;
    this.signupdata = regdata;
    // this.signindataphoneno= logindataphoneno;

  }

}