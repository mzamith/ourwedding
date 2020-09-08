import { Invite } from './../_models/Invite';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  baseUrl: string = environment.apiUrl + 'invites/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getInvite() {
    return this.http.get(this.baseUrl + this.authService.currentInvite.id);
  }

  postInvite(model: Invite) {
    return this.http.post(
      this.baseUrl + this.authService.currentInvite.id,
      model
    );
  }
}
