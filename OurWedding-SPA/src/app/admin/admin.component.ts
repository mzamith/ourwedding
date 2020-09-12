import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  toggled = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout(): void {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentInvite = null;
  }

  nav_toggle(event: any) {
    if (window.innerWidth < 568) {
      this.toggle(event);
    }
  }

  toggle(event: any) {
    event.preventDefault();
    this.toggled = !this.toggled;
  }
}
