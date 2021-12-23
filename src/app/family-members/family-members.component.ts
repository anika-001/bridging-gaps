import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.scss']
})
export class FamilyMembersComponent implements OnInit {

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
    // 'currenthelp': 'Ms Anna'
  }

  testArrayKeys: Array<'relation' | 'name' | 'age' | 'medhistory' | 'triggers' | 'dietplan' | 'gender' | 'phone' | 'currenthelp' | 'helphistory'> = ['name', 'age', 'relation', 'gender', 'phone', 'currenthelp', 'medhistory', 'dietplan', 'helphistory', 'triggers'];
  testArrayFields: Array<String> = ['Name', 'Age', 'Relation', 'Gender', 'Phone Number', 'Help', 'Medical History', 'Diet Plan', 'Help History', 'Reminders']
  constructor() { }

  ngOnInit(): void {
  }

}
