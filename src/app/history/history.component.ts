  import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private as: AuthService, private router: Router, private route: ActivatedRoute, private db: DatabaseopService) { }

  type: any;
  user: any;
  famid: any;
  dietplan: any;
  currentfamindex: any = 0;
  currentfamid: any = 0;
  // url: any = "../../assets/media/PDFs/23";
  ngOnInit(): void {
    this.type = this.route.snapshot.queryParams['id'];
    this.famid = this.route.snapshot.queryParams['famid'];

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      if(this.type == 2){
        this.getdietplan();
      }
      
    });
  }


  test(){
    this.router.navigate(['/form'], { queryParams: { id: 5, fmid: this.famid } });
  }

  getdietplan(){
    this.db.readCollection(`DietPlanDetails/${this.user.uid}/DietPlanDetails/${this.famid}/DietPlanDetails`).snapshotChanges().subscribe(res => {
      this.dietplan = res;
    })
  }

  dietplanclick( currentfamindex: any, currentfamid: any) {
    this.currentfamindex = currentfamindex;
    this.currentfamid = currentfamid;
    // this.type = type;
    // this.currentfamilymemberid = currentfammemberid;
    //  console.log(this.currentfamilymember);

  }

}
