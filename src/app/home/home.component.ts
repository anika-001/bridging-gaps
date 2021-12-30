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
  family : Array<any> = [];
  user:any;
  meddel: Array<any> = [];
  labtest: Array<any> = [];
  meetings: Array<any> = [];
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
      // this.getmeetings();
    })
  }

   myfam() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.family = res; 
      this.getmeetings();
    })
  }
   
   medicaldel(){
    this.db.readCollection(`MedApplications`).snapshotChanges().subscribe(res => {
      this.meddel = res;
    })
  }
  getpicture(i:any){
    if(this.family[i].payload.doc.data().FamilyMemberGender == 'Female'){return"https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FOld%20Woman%2FOldWoman.png?alt=media&token=a8bfaeb7-1ca8-4253-bcc1-a49728110865"}
    else if(this.family[i].payload.doc.data().FamilyMemberGender == 'Male'){return"https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FOld%20Man%2FOldMan.png?alt=media&token=9004a6b0-32d4-42b2-8159-f3788264d912"}
    else {return"https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FNeutral%20Senior%20Citizen%2FUntitled_design__10_-removebg-preview.png?alt=media&token=f383b8d9-c7a4-48ff-9838-f2920bd80679"}
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

  getmeetings(){
    this.db.readCollection(`UsersMeeting/${this.user.uid}/Meetings`).snapshotChanges().subscribe((res: any) => {
      for(let m of res){
        this.meetings.push(m.payload.doc.data());
        for(let x of this.family){
          if(x.payload.doc.id == m.payload.doc.data().familymember){
            this.meetings[this.meetings.length - 1]["name"] = x.payload.doc.data().FamilyMemberName;
          }
        }
      }
    })
  }

  isbefore(date: Date){
    if((new Date(date)).getTime() < Date.now()) return true;
    else return false;
  }

  toIst(date: Date){
    return new Date(date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
  }
}
