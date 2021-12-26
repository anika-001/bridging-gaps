import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor() { }
  time: Array<number> = [];
  hour: Array<string> = [];
  days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
  names = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"]
  timehour = ["AM", "PM",]
  ngOnInit(): void {
    for (let i = 0; i <48; i++)
     {
       this.hour.push(i.toString() + ":30 - " +(i+1) .toString() + ":30");
       this.time.push(i);
     }
  }

    


  
}
