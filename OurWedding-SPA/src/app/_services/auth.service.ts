import { Token } from './../_models/Token';
import { SimpleInvite } from './../_models/SimpleInvite';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: Token;
  currentInvite: SimpleInvite;

  constructor(private http: HttpClient) {}

  login(model: any): Observable<void> {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const res = response;
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.invite));
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.currentInvite = res.invite;
        }
      })
    );
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;

    if (this.decodedToken === undefined) {
      return false;
    }

    const userRoles = this.decodedToken.role;
    allowedRoles.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
