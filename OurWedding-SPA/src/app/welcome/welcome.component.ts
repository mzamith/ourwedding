import { AlertService } from './../_services/alert.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  accessKey: any = {};
  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.redirect();
    }
  }

  redirect() {
    if (this.authService.roleMatch(['Admin'])) {
      this.router.navigateByUrl('/admin/(admin:invites)');
    } else {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.accessKey).subscribe(
      (next) => {
        this.redirect();
      },
      (error) => {
        this.alert.danger(error);
        this.loginForm.reset();
      }
    );
  }
}
