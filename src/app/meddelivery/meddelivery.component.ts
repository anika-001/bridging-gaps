import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meddelivery',
  templateUrl: './meddelivery.component.html',
  styleUrls: ['./meddelivery.component.scss']
})
export class MeddeliveryComponent implements OnInit {

  currentRating: number = 4;
  constructor() { }

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
  }

}
