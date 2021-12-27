import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { weekdays, months as mm } from '../JSONdata/schedule';
import { DatabaseopService } from '../services/databaseop.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {
mydataapi:any;
  year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  month: number = 0;
  curryear: number = 0;
  offset: number = 0;
  currentday: number = 0;
  currentyear: number = 0;
  currentmonth: number = 0;
  currentweek: Array<String> = [];
  user: any;
  time: Array<number> = [];
  hour: Array<string> = [];
  days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  currentschedule: any = [];

  constructor(private http:HttpClient,private as: AuthService, private router: Router, private db: DatabaseopService) { }


  //Function to check if the selected day is the current day we are viewing to mark the selected day
  iscurrent(i: number, j: number) {
    if (this.currentday == this.daysofweek(i, j) && this.currentyear == this.curryear && this.currentmonth == this.month) { return true; }
    else { return false; }
  }

  //Function to check if the year is a leap year
  leapyear() {
    if (this.curryear % 4 == 0) { return true; }
    else { return false; }
  }

  //Function to print days in the month
  daysofweek(i: number, j: number) {
    let temp = (i * 7) + j + 1 - this.offset;
    if (temp > this.dayscheck(this.month) || temp < 1) { return ''; }
    return (i * 7) + j + 1 - this.offset;
  }

  //Function to check the number or days in a month
  dayscheck(mont: number) {
    if (mont % 2 == 0 && mont < 7) { return 31; }
    if (mont % 2 == 1 && mont >= 7) { return 31; }
    if (mont == 1 && this.leapyear()) { return 29; }
    if (mont == 1 && !this.leapyear()) { return 28; }
    else { return 30; }
  }

  //Get week
  getcurrentweek(){
    // this.currentday = 28;
    let temp1 = ((this.currentday - this.getcurrentday()) + this.dayscheck((this.month - 1 + 12) % 12)) % this.dayscheck((this.month - 1 + 12) % 12);
    if(this.currentday - this.getcurrentday() == 0){
      temp1 = this.dayscheck((this.month - 1 + 12) % 12);
    }
    this.currentweek.push(temp1.toString() + " ")
    if(temp1 > this.currentday){
      temp1 = (this.month - 1 + 12) % 12;
      this.currentweek[0] += temp1 + " ";
      if(temp1 > this.month){
        this.currentweek[0] += this.currentyear - 1 + "";
      }
      else{
        this.currentweek[0] += this.currentyear + "";
      }
    }
    else{
      this.currentweek[0] += this.month + " ";
      this.currentweek[0] += this.currentyear + "";
    }

    let temp2 = ((this.currentday + 6 - this.getcurrentday()) % this.dayscheck(this.month));
    this.currentweek.push(temp2.toString() + " ")
    if(temp2 < this.currentday){
      temp1 = (this.month + 1) % 12;
      this.currentweek[1] += temp1 + " ";
      if(temp2 < this.month){
        this.currentweek[1] += this.currentyear + 1 + "";
      }
      else{
        this.currentweek[1] += this.currentyear + "";
      }
    }
    else{
      this.currentweek[1] += this.month + " ";
      this.currentweek[1] += this.currentyear + "";
    }

    console.log(this.currentweek[0], this.currentweek[1]);  
  }

  //gets current day
  getcurrentday(){
    let WD: any = weekdays;
    return WD[(new Date(this.currentyear, this.currentmonth, this.currentday)).toString().split(" ")[0]];
    // return (this.offset + ((this.currentday - 1)%7))%7;
  }

  //select a date
  select(i: number, j: number){
    let dow = this.daysofweek(i, j)
    if(dow == '') return;
    this.currentday = Number(dow);
    this.currentyear = this.curryear;
    this.currentmonth = this.month;
    this.currentweek = [];
    this.getcurrentweek();
  }

  //Function for left and right arrows of the calender
  move(dir: 'f' | 'b') {
    if (dir == 'f') {
      this.offset = (this.offset + (this.dayscheck(this.month) % 7)) % 7;
      this.month += 1;
      if (this.month == 12) {
        this.month = 0;
        this.curryear += 1;
      }
    }
    if (dir == 'b') {
      let temp = this.month - 1;
      if (temp < 0) { temp = 11; }
      this.offset = (this.offset - (this.dayscheck(temp) % 7)) % 7;
      if (this.offset < 0) {this.offset += 7;}
      this.month -= 1;
      if (this.month == -1) {
        this.month = 11;
        this.curryear -= 1;
      }
    }
  }


  availability(timeslot: number, day: number, avail: string){
    let week = this.currentweek[0] + " - " + this.currentweek[1];
    this.db.createdoc(`Availability/${this.user.uid}/Weeks/${week}`, {'day': day, 'timeslot': timeslot, 'availability': avail});
  }

  getavailability(timeslot: number, day: number){
    let week = this.currentweek[0] + " - " + this.currentweek[1];
    this.db.readCollection(`Availability/${this.user.uid}/Weeks/${week}/days`).snapshotChanges().subscribe(res => {
      if(res){
        for(let r of res){
          this.db.readCollection(`Availability/${this.user.uid}/Weeks/${week}/days/${r.payload.doc.id}/time`).snapshotChanges().subscribe(res => {
            // this.currentschedule["r.payload.doc.id"] = 
          })
          
        }
        
        
      }
    })
    // this.db.readDoc(`Availability/${this.user.uid}/Weeks/${week}/days/${day}/time/${timeslot}`).snapshotChanges().subscribe((res:any) => {
    //   if(res && res.payload.data().availability){
    //     return res.payload.data().availability; 
    //   }
    //   else{
    //     return "none";
    //   }
    // })
  }
postid:any;
  mypostreq(){
    
    const body = {
      emailD: "bridginggaps@gmail.com",
      emailP: "vaishnavisdesai@gmail.com",
      time: Date.now()
  };
    this.http.post<any>('https://hooks.zapier.com/hooks/catch/11517211/b1m66ci/', body).subscribe(data => {
        this.postid = data.id;
    });
  }
  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    });

    

    let d = new Date();
    let darr = d.toString().split(" ");
    console.log(darr)
    let m: any = mm;
    this.month = m[darr[1]];

    this.currentday = Number(darr[2]);
    this.curryear = Number(darr[3]);
    this.currentmonth = this.month;
    this.currentyear = this.curryear;

    let WD: any = weekdays;
    this.offset = WD[(new Date(this.currentyear, this.currentmonth, 1)).toString().split(" ")[0]];

    this.getcurrentweek();
    for (let i = 0; i < 48; i++) {
      this.hour.push(((i + 6) % 24).toString() + ":30 - " + ((i + 7) % 24).toString() + ":00");
      this.time.push(i);
      this.hour.push(((i + 7) % 24).toString() + ":00 - " + ((i + 7) % 24).toString() + ":30");
      this.time.push(i);
    }
  }
}
