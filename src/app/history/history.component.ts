import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  url: any = "https://firebasestorage.googleapis.com/v0/b/educationapp-8ef4c.appspot.com/o/8wH11C6nvOWxofHfKEPTdZtHNPs1%2Fresume?alt=media&token=3738f8f2-c110-40fa-9bd5-da68c4697476";
  ngOnInit(): void {
  }
}
