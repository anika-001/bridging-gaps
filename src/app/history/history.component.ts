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
  familymemid: any;
  dietplan: any;
  helper: any;
  medhis: any;
  currentfamindex: any = 0;
  currentfamid: any = 0;
  currenthelpindex: any = 0;
  currenthelpid: any = 0;
  currentmedindex: any = 0;
  currentmedid: any = 0;
  // url: any = "../../assets/media/PDFs/23";
  ngOnInit(): void {
    this.type = this.route.snapshot.queryParams['id'];
    this.famid = this.route.snapshot.queryParams['famid'];

    this.currentfamindex = 0;
    this.currentfamid = 0;
    this.currenthelpid = 0;
    this.currentfamindex = 0;
    this.currentmedid = 0;
    this.currentmedindex = 0;

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
      if (this.type == 2) {
        this.getdietplan(); 
      }
      else if(this.type == 3){
        this.gethelp();
      }
      else if(this.type == 1) {
        this.getmed();
      }

    });
  }


  gotoadddiet() {
    this.router.navigate(['/form'], { queryParams: { id: 5, fmid: this.famid } });
  }

  getdietplan() {
    this.db.readCollection(`DietPlanDetails/${this.user.uid}/DietPlanDetails/${this.famid}/DietPlanDetails`).snapshotChanges().subscribe(res => {
      this.dietplan = res;
      // console.log(this.dietplan);
    })
  }

  gotoaddhelp() {
    this.router.navigate(['/form'], { queryParams: { id: 4, fmid: this.famid } });
  }

  gethelp() {
    this.db.readCollection(`HelperDetails/${this.user.uid}/HelperDetails/${this.famid}/helperdetails`).snapshotChanges().subscribe(res => {
      this.helper = res;
      console.log(this.helper);
    })
  }

  gotoaddmed() {
    this.router.navigate(['/form'], { queryParams: { id: 3, fmid: this.famid } });
  }

  getmed() {
    this.db.readCollection(`MedicalReport/${this.user.uid}/MedicalReport/${this.famid}/medicalreports`).snapshotChanges().subscribe(res => {
      this.medhis = res;
      console.log(this.medhis);
    })
  }

  click(currentfamindex: any, currentfamid: any) {
    this.currentfamindex = currentfamindex;
    this.currentfamid = currentfamid;
  }

  clickhelp(currenthelpindex: any, currenthelpid: any) {
    this.currenthelpindex = currenthelpindex;
    this.currenthelpid = currenthelpid;
  }

  clickmed(currentmedindex: any, currentmedid: any) {
    this.currentmedindex = currentmedindex;
    this.currentmedid = currentmedid;
  }


}
