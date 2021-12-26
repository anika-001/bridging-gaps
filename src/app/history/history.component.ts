import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  // url: any = "../../assets/media/PDFs/23";
  ngOnInit(): void {
  }
}
