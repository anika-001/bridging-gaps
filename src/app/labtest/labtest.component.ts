import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';
@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.scss']
})
export class LabtestComponent implements OnInit {
  links: any;
  user:any;
  currentlabs:any=0;
  currentlabsid:any;
  // currRating: number = 4;
  constructor(private as: AuthService, private router: Router,private db: DatabaseopService) {}
  

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
    this.lablink();
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
    });

  }

  currentlinkclick(currlabs:any){
    this.currentlabs= currlabs;
    // this.currentlinksid=currentlinksid;
   console.log(this.currentlabs);
  }
  
  lablink(){
    this.db.readCollection(`labtest`).snapshotChanges().subscribe(res => {
      this.links = res;
      console.log(this.links[0].payload.doc.data());
    })
    
  }

}
