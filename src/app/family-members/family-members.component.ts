import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.scss']
})
export class FamilyMembersComponent implements OnInit {
  user: any;
  members: any;
  remind: any;
  famid: any;
  currentfamilymember: any = 0;
  currentfamilymemberid: any;
  currentremindid: any = 0;
  currentremindindex: any = 0;
  

  test: any = {
    // 'relation': this.members[currentfamilymember].payload.doc.data().Relation,
    // 'name': this.members[currentfamilymember].payload.doc.data().FamilyMemberName,
    // 'age': this.members[currentfamilymember].payload.doc.data().FamilyMemberAge,
    // 'medhistory': 'blabla',
    // 'triggers': 'lalala',
    // 'phone': this.members[currentfamilymember].payload.doc.data().FamilyMemberPhoneNumber,
    // 'gender': this.members[currentfamilymember].payload.doc.data().FamilyMemberGender,
    // 'dietplan': 'dietplan',
    // 'helphistory': this.members[currentfamilymember].payload.doc.data().help,
    // 'currenthelp': 'Ms Anna'
  }

  testArrayKeys: Array<'Relation' | 'FamilyMemberName' | 'FamilyMemberAge' | 'medhistory' | 'triggers' | 'dietplan' | 'FamilyMemberGender' | 'FamilyMemberPhoneNumber' | 'help' | 'helphistory'> = ['FamilyMemberName', 'FamilyMemberAge', 'Relation', 'FamilyMemberGender', 'FamilyMemberPhoneNumber', 'help', 'medhistory', 'dietplan', 'helphistory', 'triggers'];
  testArrayFields: Array<String> = ['Name', 'Age', 'Relation', 'Gender', 'Phone Number', 'Help', 'Medical History', 'Diet Plan', 'Help History', 'Reminders']
  constructor(private as: AuthService, private router: Router, private db: DatabaseopService) { }

  ngOnInit(): void {
    this.currentremindid = 0;
    this.currentremindindex = 0;

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.getfamilymembers();
    })
      
  }

  fam() {
    this.router.navigate(['/form'], { queryParams: { id: 1 } });
  }

  familymemberclick(familymember: any, currentfammemberid: any) {
    this.currentfamilymember = familymember;
    this.currentfamilymemberid = currentfammemberid;
  }

  diet() {
    this.router.navigate(['/history'], { queryParams: { id: 2, famid: this.currentfamilymemberid }});
  }

  help() {
    this.router.navigate(['/history'], { queryParams: { id: 3, famid: this.currentfamilymemberid }});
  }

  medicalhis() {
    this.router.navigate(['/history'], { queryParams: { id: 1, famid: this.currentfamilymemberid }});
  }

  rem() {
    this.router.navigate(['/reminders'], { queryParams: {famid: this.currentfamilymemberid }});
  }

  getfamilymembers() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.members = res; 
      this.currentfamilymemberid = res[0].payload.doc.id;
    })
  }

  gethelper() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.members = res; 
      this.currentfamilymemberid = res[0].payload.doc.id;
    })
  }

  getmedrep() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.members = res; 
      this.currentfamilymemberid = res[0].payload.doc.id;
    })
  }

  getremind() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.members = res; 
      this.currentfamilymemberid = res[0].payload.doc.id;
    })
  }

  getimage(i:any) {
    if(this.members[i].payload.doc.data().FamilyMemberGender == 'Female'){return"https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FOld%20Woman%2FOldWoman.png?alt=media&token=a8bfaeb7-1ca8-4253-bcc1-a49728110865"}
    else if(this.members[i].payload.doc.data().FamilyMemberGender == 'Male'){return"https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FOld%20Man%2FOldMan.png?alt=media&token=9004a6b0-32d4-42b2-8159-f3788264d912"}
    else {return"https://firebasestorage.googleapis.com/v0/b/bridging-gaps-677a5.appspot.com/o/Assets%2FNeutral%20Senior%20Citizen%2FUntitled_design__10_-removebg-preview.png?alt=media&token=f383b8d9-c7a4-48ff-9838-f2920bd80679"}
  }

  // gotoremind() {
  //   this.router.navigate(['/reminderslot'], { queryParams: {fmid: this.famid } });
  // }

}
