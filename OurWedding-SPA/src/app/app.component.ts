import { SimpleInvite } from './_models/SimpleInvite';
import { Token } from './_models/Token';
import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  testlogin: any = {
    accessKey: 'adminkey',
  };
  token: Token;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.login(this.testlogin).subscribe(
      (next) => {
        console.log(next);
      },
      (error) => {
        console.log(error);
      },
      () => {
        //this.router.navigate(['/members']);
      }
    );

    const token = localStorage.getItem('token');
    const invite: SimpleInvite = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.token);
    }
    if (invite) {
      this.authService.currentInvite = invite;
    }
  }
}
