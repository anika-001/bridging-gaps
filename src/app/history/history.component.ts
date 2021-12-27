import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private as: AuthService, private router: Router, private route: ActivatedRoute) { }

  type: any;
  user: any;
  famid: any;
  // url: any = "../../assets/media/PDFs/23";
  ngOnInit(): void {
    this.type = this.route.snapshot.queryParams['id'];
    this.famid = this.route.snapshot.queryParams['famid'];

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
    });
  }

  test(){
    this.router.navigate(['/form'], { queryParams: { id: 5, fmid: this.famid } });
  }

}
