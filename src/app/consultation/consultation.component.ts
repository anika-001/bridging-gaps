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
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
    })
    this.getdoctors();
    this.getratings();
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
  getlink(i:any){
    if(this.doctors[i].payload.doc.data().Gender == 'Female'){return "https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FDoctor%2Fimage-removebg-preview.png?alt=media&token=8f306bf2-ec36-46aa-ae92-e99017871148";}
    else if (this.doctors[i].payload.doc.data().Gender == 'Male'){return "https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FMale%20Doctor%2Fimage-removebg-preview%20(6).png?alt=media&token=9f5ec334-efb7-460d-8db6-1aed0d7865eb"}
    else {return "https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FNeutral%20Doctor%2FUntitled_design__9_-removebg-preview.png?alt=media&token=f051faeb-8bb6-498e-be78-33968c0deb91"}
  }
  gotoreviews() {
    console.log("hello");
    this.router.navigate(['/review'], { queryParams: { docid: this.currentdoctordocid } });
  }

  addareview(){
    this.router.navigate(['/form'], { queryParams: { id: 8, docid: this.currentdoctordocid } });
  }
  ratings:any;
  getratings() {
    this.db.readCollection(`Reviewsrating/${this.currentdoctordocid}/ratings`).snapshotChanges().subscribe(res => {
      this.ratings = res; 
      console.log("here")
      console.log(this.ratings);
    })
  }
}
