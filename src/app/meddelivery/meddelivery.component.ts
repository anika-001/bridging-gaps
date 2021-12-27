import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-meddelivery',
  templateUrl: './meddelivery.component.html',
  styleUrls: ['./meddelivery.component.scss']
})

export class MeddeliveryComponent implements OnInit {
  links: any;
  user:any;
  currentRating: number = 4;
  constructor(private as: AuthService, private router: Router,private db: DatabaseopService) {}
  

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
    this.medicallinks();
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    });
  }
  
  medicallinks(){
    this.db.readCollection(`MedApplications`).snapshotChanges().subscribe(res => {
      this.links = res;

    })
  }
}
