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
  currentfamilymember: any = 0;
  currentfamilymemberid: any;

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
    //  console.log(this.currentfamilymember);

  }

  diet() {
    this.router.navigate(['/history'], { queryParams: { id: 2, famid: this.currentfamilymemberid }});
  }

  help() {

  }

  getfamilymembers() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.members = res; 
      this.currentfamilymemberid = res[0].payload.doc.id;
    })
  }
}
