import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) {}
  user:any;
  time: Array<number> = [];
  hour: Array<string> = [];
  days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
  names = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"]
  timehour = ["AM", "PM",]
  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    });
    for (let i = 0; i <48; i++)
     {
       this.hour.push(i.toString() + ":30 - " +(i+1) .toString() + ":30");
       this.time.push(i);
     }
  }

    


  
}
