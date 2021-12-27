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
  currentfamilymemberid:any;
  test: any = {
    'relation': 'grandmama',
    'name': 'Ajji',
    'age': '80 years',
    'medhistory': 'blabla',
    'triggers': 'lalala',
    'phone': '9988997788',
    'gender': 'Female',
    'dietplan': 'dietplan',
    'helphistory': 'help',
    'currenthelp': 'Ms Anna'
  }

  testArrayKeys: Array<'relation' | 'name' | 'age' | 'medhistory' | 'triggers' | 'dietplan' | 'gender' | 'phone' | 'currenthelp' | 'helphistory'> = ['name', 'age', 'relation', 'gender', 'phone', 'currenthelp', 'medhistory', 'dietplan', 'helphistory', 'triggers'];
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
  familymemberclick(familymember:any,currentfammemberid:any){
   this.currentfamilymember=familymember;
   this.currentfamilymemberid=currentfammemberid;
   console.log(this.currentfamilymember);

  }
  // diet() {
  //   this.router.navigate(['/form'], { queryParams: { id: 5, fmid: this.currentfamilymember } });
  // }
  getfamilymembers() {
    this.db.readCollection(`familymembers/${this.user.uid}/familymember`).snapshotChanges().subscribe(res => {
      this.members = res;


    })
  }
}
