import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent   implements OnInit {
  currentRating: number = 4;
  user:any;
  constructor(private as: AuthService, private router: Router) {}

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    })
  }

}
