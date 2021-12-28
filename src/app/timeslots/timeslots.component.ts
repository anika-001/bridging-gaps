import {Component, OnInit ,NgZone, ChangeDetectorRef } from '@angular/core';
import { ExternalLibraryService } from '../utils';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare let Razorpay: any;
import { HttpClient } from '@angular/common/http';
import { months, weekdays } from '../JSONdata/schedule';
import { DatabaseopService } from '../services/databaseop.service';
@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.scss']
})
export class TimeslotsComponent implements OnInit {
  info = ["Time", "Day", "Date", "Book slots"];
  constructor( private http:HttpClient,private as: AuthService,private router: Router, private route: ActivatedRoute, private db: DatabaseopService, private zone: NgZone,private razorpayService: ExternalLibraryService) { }
  response: any;
  razorpayResponse: any;
  showModal = false;
  items: any;
  total: number = 0;
  subtotal: number = 100;
  shipping: number = 100;
  user:any;
  currentweek: any = [];
  hour: Array<string> = [];
  slots: Array<any> = [];
  docid: any;

  ngOnInit(): void {
    this.mypostreq();
    this.getnowweek();
    this.initializeTimeSlots();
    // this.getseconds(0);
    this.docid = this.route.snapshot.queryParams['id'];
    // console.log(this.islesserthannow(28, 11, 2021, 8));
    this.as.getUserState().subscribe(user => {
      if(user == null) this.router.navigate(['/signin']);
      this.user = user;
      // this.getcart(user)
      this.getslots();
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
      "patientID": "1fromangular",
      "doctorID": "2",
       "userID": "1"
  };
    this.http.post<any>('https://krashibrahmand.herokuapp.com/zapierapi', body).subscribe(data => {
        this.postid = data.id;
        console.log(data);
    });
  }

  getnowweek(){
    let WD: any = weekdays;
    let offset = WD[(new Date()).toString().split(" ")[0]];
    let m: any = months;
    // let date1 = (Number((new Date()).toString().split(" ")[2]) + 0) + " " + m[(new Date()).toString().split(" ")[1]] + " " +(new Date()).toString().split(" ")[3];
    let date1 = (Number(new Date(Date.now() - (offset) * 86400000).toString().split(" ")[2]) + 0) + " " + m[(new Date(Date.now() - (offset) * 86400000)).toString().split(" ")[1]] + " " +(new Date(Date.now() - (offset) * 86400000)).toString().split(" ")[3];
    let date2 = (Number(new Date(Date.now() + (6 - offset) * 86400000).toString().split(" ")[2]) + 0) + " " + m[(new Date(Date.now() + (6 - offset) * 86400000)).toString().split(" ")[1]] + " " +(new Date(Date.now() + (6 - offset) * 86400000)).toString().split(" ")[3];
    this.currentweek.push(date1);
    this.currentweek.push(date2);
    // console.log(new Date(2021, 11, 28));
  }

  islesserthannow(day: number, slot: number){
    // console.log(this.getseconds(slot));
    // console.log(Date.now(), (new Date(year, month, day)).getTime(), (new Date(year, month, day)).getTime() + this.getseconds(slot))
    
    let weeek = this.currentweek[0].split(" ");
    if(Date.now() > (new Date(weeek[2], weeek[1], weeek[0])).getTime() + day*24*60*60*1000 + this.getseconds(slot)) return true
    return false;
  }

  getseconds(slot: number){
    // console.log(this.hour[slot][0], this.hour[slot][2]);
    // console.log((Number(this.hour[slot][0])*60*60*1000) + (Number(this.hour[slot][2])*10*60*1000));
    let temp = this.hour[slot][1] == ':' ? (Number(this.hour[slot][2]))  : (Number(this.hour[slot][3]));
    let temp2 = this.hour[slot][1] == ':' ? (Number(this.hour[slot][0]))  : (Number(this.hour[slot][0] + this.hour[slot][1]));
    
    // console.log(temp, temp2, "njjjj");
    return (temp2*60*60*1000 + temp*10*60*1000);
  }

  initializeTimeSlots(){
    for (let i = 0; i < 24; i++) {
      this.hour.push(((i + 6) % 24).toString() + ":30 - " + ((i + 7) % 24).toString() + ":00");
      this.hour.push(((i + 7) % 24).toString() + ":00 - " + ((i + 7) % 24).toString() + ":30");
    }
  }

  getslots(){
    let week = this.currentweek[0] + " - " + this.currentweek[1];
     console.log(week);
    this.db.readCollection(`Availability/${this.docid}/Weeks/${week}/days`).snapshotChanges().subscribe(res => {
      this.slots = res;
      // console.log(res);
      // console.log(res[0].payload.doc.data());
    })
  }


}
