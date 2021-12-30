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
 
  constructor(private as: AuthService, private router: Router) {}

  login: boolean = true;
  error: string = '';
  errormessage: any;
  selectedrole: any;
  signindata: any;
  signupdata: any;
 

  move() {
    this.login = !this.login;
  }

  submit() {
    if (this.login) {
      if (!this.formlogin.invalid) {
        this.as
          .login(this.formlogin.value)
          .then((res) => {
            this.as.getUserState().subscribe(res => {
              if(res){
                this.as.getprofile(res.uid).subscribe((res:any) => {
                  if(res.payload.data().role == 1){this.router.navigate(['/home']);}
                  else if(res.payload.data().role == 2) this.router.navigate(['/schedule']);
                  else {
                     this.router.navigate(['/form'],{ queryParams: { id: 7}})
                  }
                })
              }
            })
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
        let data = this.formreg.value;
          data['role'] = this.signupdata[5].value;
          this.as.signup(data)
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
    
  }

  
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
      confirmpassword: new FormControl('', [Validators.required]),
    },
    { validators: this.checkPasswords }
  );

  ngOnInit(): void {
    this.signindata = logindata;
    this.signupdata = regdata;    
  }
  

  formlog(name: string) {
    return this.formlogin.get(name)!;
  }
  formregget(name: string) {
    return this.formreg.get(name)!;
  }

  checkPasswords(group: AbstractControl) {
    // here we have the 'passwords' group
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmpassword')?.value;

    console.log(pass, confirmPass, pass == confirmPass);
    return pass === confirmPass ? null : { notSame: true };
  }
}
