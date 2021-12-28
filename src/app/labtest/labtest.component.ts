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
  currentlinks:any=0;
  currentlinksid:any;
  currentRating: number = 4;
  constructor(private as: AuthService, private router: Router,private db: DatabaseopService) {}
  

  tags = ["tag1", "absuhue", "t", "jjjjjjjjjjjjjjjj"];

  ngOnInit(): void {
    
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.lablink();
    });

  }

  currentlinkclick(currlinks:any){
    this.currentlinks= currlinks;
    // this.currentlinksid=currentlinksid;
   console.log(this.currentlinks);
  }
  
  lablink(){
    this.db.readCollection(`labtest`).snapshotChanges().subscribe(res => {
      this.links = res;
     
    })
    console.log(this.links);
  }

}
