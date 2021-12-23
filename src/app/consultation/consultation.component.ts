import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent   implements OnInit {
  currentRating: number = 4;
  constructor() { }

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
  }

}
