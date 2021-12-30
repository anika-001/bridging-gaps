import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navbar, navbardoctor } from '../JSONdata/navbar'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navdata: any;
  navdoc: any;
  user: any;
  role: any = null;
  constructor(private as: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.navdata = navbar;
    this.navdoc = navbardoctor;
    
    this.as.getUserState().subscribe(res => {
      if (!res) return;
      this.user = res;
      this.as.getprofile(this.user.uid).subscribe((res: any) => {
        this.role = res.payload.data().role;
      })
    })
  }

  logout() {
    this.as.logout().then(res => {this.router.navigate(['/signin']);})   
  }
}
