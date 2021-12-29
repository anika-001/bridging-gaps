import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseopService } from '../services/databaseop.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  user: any;
  docid: any;
  
  constructor(private as: AuthService, private router: Router, private route: ActivatedRoute, private db: DatabaseopService) { }

  ngOnInit(): void {

    this.docid = this.route.snapshot.queryParams['docid'];

    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.user = res;
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        if (res.payload.data().role != 1) { this.router.navigate(['/signin']); }
      })
    })
  }

}
