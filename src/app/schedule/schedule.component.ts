import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {weekdays, months as mm} from '../JSONdata/schedule';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']

 
  
})
export class ScheduleComponent implements OnInit {
  
  iscurrent( i: number , j: number) {
    if (this.currentday==this.daysofweek(i,j) && this.currentyear==this.curryear && this.currentmonth==this.month) {
    return true
  }
  else
  {
    return false;
  }
  
  }
 
  
 
   leapyear(){
    if(this.curryear % 4== 0 ){
      return true; 
      
    }
    else{
      return false;
    }

  }
  daysofweek(i: number, j: number){
    let temp = (i*7)+j +1 -this.offset;
    if (temp> this.dayscheck(this.month)|| temp < 1 )  {
       return "";
    }

    return (i*7)+j +1 -this.offset;
    
  }
  
  dayscheck(mont: number){
      if (mont % 2 == 0 && mont < 7 ) {
        return 31;
      }
      if (mont %2 == 1 && mont >= 7 ) {
        return 31;
      }
      if (mont == 1 && this.leapyear() ){
      return 29;}
      if (mont == 1 && !this.leapyear() ){
      return 28;}
      else{ 
        return 30;
      }
  }
  move(dir:'f' | 'b')  {
    
    // this.month +=1;
    // if (this.month ==12){
    //    this.month=0;
    // }
    if(dir == 'f'){
      this.offset = (this.offset + (this.dayscheck(this.month)%7)) %7;
      
      this.month += 1;
      if(this.month == 12){
      this.month = 0;

      this.curryear += 1;
      }
      }
      if(dir == 'b'){
        let temp = this.month - 1;
        if(temp< 0){
          temp = 11;
        }
        this.offset = (this.offset - (this.dayscheck(temp)%7)) %7;
        if (this.offset < 0){
          this.offset += 7;
        } 
        this.month -= 1;
        if(this.month == -1){
        this.month = 11;
        this.curryear -= 1;
        }
     
      }
  }
  
  year = ["January", "February", "March", "April" , "May", "June", "July","August","September","October","November","December"]
  month: number =0;
  curryear:number =0;
  offset:number =0;
  currentday:number=0;
  currentyear:number=0;
  currentmonth:number=0;
  constructor(private as: AuthService, private router: Router) {}
  user:any;
  time: Array<number> = [];
  hour: Array<string> = [];
  days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  
  timehour = ["AM", "PM",]
  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    });
    
    let d = new Date();
    let darr = d.toString().split(" ");
    console.log(darr)
    let WD:any= weekdays;
    this.offset= WD[darr[0]]; 
    let m:any= mm;
    this.month= m[darr[1]];

    this.currentday=Number(darr[2]);
    this.curryear=Number(darr[3]);
    this.currentmonth=this.month;
    this.currentyear=this.curryear;
  
    for (let i = 0; i <48; i++)
     {
       this.hour.push( ((i+6)%24).toString() + ":30 - " +((i+7)%24) .toString() + ":00"  );
       this.time.push(i);
       this.hour.push( ((i+7)%24).toString() + ":00 - " +((i+7)%24) .toString() + ":30"  );
       this.time.push(i);
     }
     
    
     {
     
        // send_date = new Date();
        // formattedDate: any;
  
        // this.send_date.setMonth(this.send_date.getMonth() + 8);
        // this.formattedDate = this.send_date.toISOString().slice(0, 10);
        //  console.log(this.formattedDate);
       
     
     }
    
  }

  
}
