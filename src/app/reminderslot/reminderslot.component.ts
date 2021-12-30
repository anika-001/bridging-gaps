import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-reminderslot',
  templateUrl: './reminderslot.component.html',
  styleUrls: ['./reminderslot.component.scss']
})
export class ReminderslotComponent implements OnInit {
  info = ["Medicine Name", "Time"];
  constructor(private as: AuthService, private router: Router, private route: ActivatedRoute, private db: DatabaseopService) { }
  response: any;
  remind: any;
  famid: any;
  user:any;
  rem: any;
  currentremindindex: any = 0;
  currentremindid: any = 0;
  // currentfamilymemberid: any;

  ngOnInit(): void {
    this.currentremindid = 0;
    this.currentremindindex = 0;
    this.famid = this.route.snapshot.queryParams['famid'];
    this.as.getUserState().subscribe(user => {
      if(user == null) this.router.navigate(['/signin']);
      this.user = user;
      this.getremind(); 
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
    })
  }

  getremind() {
    this.db.readCollection(`Reminders/${this.user.uid}/Reminders/${this.famid}/reminders`).snapshotChanges().subscribe(res => {
      this.remind = res;
    })
  }

  gotoaddremind() {
    this.router.navigate(['/form'], { queryParams: { id: 9, fmid: this.famid } });
  }
}


