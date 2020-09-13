import { Access } from './../_models/Access';
import { AdminService } from './../_services/admin.service';
import { AlertService } from './../_services/alert.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminAccessesResolver implements Resolve<Access[]> {
  constructor(
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Access[]> {
    return this.adminService.getAccesses().pipe(
      catchError((error) => {
        this.alert.danger(error);
        return of(null);
      })
    );
  }
}
