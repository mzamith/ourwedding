import { AuthService } from './../_services/auth.service';
import { InviteService } from './../_services/invite.service';
import { Invite } from './../_models/Invite';
import { AlertService } from './../_services/alert.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminInviteResolver implements Resolve<Invite> {
  constructor(
    private inviteService: InviteService,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Invite> {
    return this.inviteService.getInvite(route.params['id']).pipe(
      catchError((error) => {
        this.router.navigate(['/home']);
        this.alert.danger(error);
        return of(null);
      })
    );
  }
}
