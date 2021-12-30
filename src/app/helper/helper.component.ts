import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {
  user: any;
  caretaker: Array<any> = [];
  currenthelper: any = 0;
  currenthelperid: any;

  testArrayKeys: Array<'HelperName' | 'HelperAge' | 'Gender' | 'HelperLocation' | 'HelperPhoneNumber' | 'HelperOrganisation' |'HelperDescription' > = ['HelperName', 'HelperAge','Gender', 'HelperLocation', 'HelperPhoneNumber','HelperOrganisation',  'HelperDescription'];
  testArrayFields: Array<String> = ['Name', 'Age', 'Gender', 'Location','Phone Number', 'Organization', 'Description']
  constructor(private as: AuthService, private router: Router, private db: DatabaseopService) { }

  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.gethelper();
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
    })

  }
  
  helperclick(helper: any, currenthelperid: any) {
    this.currenthelper = helper;
    this.currenthelperid = currenthelperid;
  }


  gethelper() {
    this.db.readCollection(`Caretakers`).snapshotChanges().subscribe(res => {
      this.caretaker= res; 
      this.currenthelperid = res[0].payload.doc.id;
    })
 
  }

}
