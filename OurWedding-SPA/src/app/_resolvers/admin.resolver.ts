import { AdminService } from './../_services/admin.service';
import { Invite } from './../_models/Invite';
import { AlertService } from './../_services/alert.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminResolver implements Resolve<Invite[]> {
  constructor(
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Invite[]> {
    return this.adminService.getInvites().pipe(
      catchError((error) => {
        this.alert.danger(error);
        return of(null);
      })
    );
  }
}
