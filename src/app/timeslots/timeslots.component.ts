import {Component, OnInit ,NgZone, ChangeDetectorRef } from '@angular/core';
import { ExternalLibraryService } from '../utils';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare let Razorpay: any;
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.scss']
})
export class TimeslotsComponent implements OnInit {
  info = ["Time", "Day", "Date", "Book slots"];
  constructor( private http:HttpClient,private as: AuthService,private router: Router,private db: AngularFirestore, private zone: NgZone,private razorpayService: ExternalLibraryService) { }
  response: any;
  razorpayResponse: any;
  showModal = false;
  items: any;
  total: number = 0;
  subtotal: number = 100;
  shipping: number = 100;
  user:any;
  ngOnInit(): void {
    this.mypostreq();
    this.as.getUserState().subscribe(user => {
      if(user == null) this.router.navigate(['/signin']);
      // this.getcart(user)
      ;
      this.as.getprofile(this.user.uid).subscribe((profile:any)=>{
        this.RAZORPAY_OPTIONS.prefill.email = this.user.email;
          this.RAZORPAY_OPTIONS.prefill.contact = profile.payload.data().phone;
          this.RAZORPAY_OPTIONS.prefill.name = profile.payload.data().name;

      })
    })
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }
  RAZORPAY_OPTIONS = {
    "key": "rzp_test_FDaOlFcAsJX6Ij",
    "secret":"LxCYNAlsId4K5behRTulAds5",
    "amount": "10000",
    "name": "Bridging Gaps",
    "order_id": "",
    "description": "",
    "image": "../../assets/media/images/Logo.png",
    "prefill": {
      "name": "Bridging Gaps",
      "email": " ieeebridginggaps@gmail.com",
      "contact": "93847563535",
      "method": ""
    },
    "handler": {},
    "modal": {},
    "theme": {
      "color": "#3c8d93"
    }
  };
  public proceed() {
    this.RAZORPAY_OPTIONS.amount = ((this.total + 100)*100) + '';
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public razorPaySuccessHandler(response: any) {
    console.log(response);
    this.razorpayResponse = `Successful Transaction`;
    console.log(this.razorpayResponse);
    this.router.navigate(['/home']);

    this.zone.run(() => {
      this.router.navigateByUrl("/orders");
    });

  }
  postid:any;
  mypostreq(){
    console.log("in post req");
    const body = {
      "email1": "aanchalkviit@gmail.com",
      "email2": "anikatibrewala@gmail.com",
      "time": Math.floor(Date.now()/1000),
      "patientID": "1",
      "doctorID": "2",
       "userID": "1"
  };
    this.http.post<any>('https://hooks.zapier.com/hooks/catch/11517211/b1m66ci/', body).subscribe(data => {
        this.postid = data.id;
    });
  }
}
