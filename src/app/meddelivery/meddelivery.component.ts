import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-meddelivery',
  templateUrl: './meddelivery.component.html',
  styleUrls: ['./meddelivery.component.scss']
})

export class MeddeliveryComponent implements OnInit {

  currentRating: number = 4;
  constructor(private as: AuthService, private router: Router) {}
  user:any;

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    });
  }

}
