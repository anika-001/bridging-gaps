import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.scss']
})
export class TimeslotsComponent implements OnInit {
  info = ["Time", "Day", "Date", "Book slots"];
  constructor() { }
  
  ngOnInit(): void {
  }

}
