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
  labtest: any;
  // currfammember:any = 0;
  // currfammemberid: any;
  // currentli:any =0;
  // currentliid:any;

  constructor(private as: AuthService, private router: Router, private db: DatabaseopService) {}
  

  ngOnInit(): void {
    this.medicaldel();
    this.labs();
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
  labs() {
    this.db.readCollection(`labtest`).snapshotChanges().subscribe(res => {
      this.labtest = res;
    })
  }
  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
