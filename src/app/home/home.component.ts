import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  family : any;
  user:any;
  meddel:any;
  // currfammember:any = 0;
  // currfammemberid: any;
  // currentli:any =0;
  // currentliid:any;

  constructor(private as: AuthService, private router: Router, private db: DatabaseopService) {}
  

  ngOnInit(): void {
    this.medicaldel();
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.myfam();
    })
  }

  // myfam(familymember: any, currfammemberid: any){
  //   this.currfammember = familymember;
  //   this.currfammemberid = currfammemberid;
  // }

   myfam() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.family = res; 
      // this.currfammemberid = res[0].payload.doc.id;
    })
  }
   
  //  currentliclick(link:any, currentliid: any){
  //   this.currentli = link;
  //   this.currentliid = currentliid;
  //  }
   
   medicaldel(){
    this.db.readCollection(`MedApplications`).snapshotChanges().subscribe(res => {
      this.meddel = res;
    })
  }
}
