import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent   implements OnInit {
  currentRating: number = 4;
  user:any;
  doctors: any;
  currentdoctorindex: number = 0;
  currentdoctordocid: any = 0;

  constructor(private as: AuthService, private router: Router, private db: DatabaseopService) {}

  tags: any = [];

  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    })
    this.getdoctors();
  }

  getdoctors(){
    this.db.readCollection(`Doctors`).snapshotChanges().subscribe(res => {
      this.doctors = res;
      this.tags = this.doctors[0].payload.doc.data().Tags.split(" ");
      this.currentdoctordocid = this.doctors[0].payload.doc.id;
    })
  }

  doctorclick(id: any, ind: number){
    this.tags = this.doctors[ind].payload.doc.data().Tags.split(" ");
    this.currentdoctordocid = id;
    this.currentdoctorindex = ind;
  }

  getslots(){
    this.router.navigate(['/slots'], { queryParams: { id: this.currentdoctordocid }});
  }
}
