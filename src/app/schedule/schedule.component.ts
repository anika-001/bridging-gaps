import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor() { }
  time: Array<number> = [];
  days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
  ngOnInit(): void {
    for (let i = 0; i <48; i++)
     {
       this.time.push(i);
     }
  }
  
}
