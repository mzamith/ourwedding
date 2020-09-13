import { Access } from './../_models/Access';
import { DetailedInvite } from './../_models/DetailedInvite';
import { Invite } from './../_models/Invite';
import { PaginatedResult } from './../_models/pagination';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.apiUrl + 'admin/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getInvites(page?, itemsPerPage?, status?, isBlacklisted?) {
    const result: PaginatedResult<DetailedInvite[]> = new PaginatedResult<
      DetailedInvite[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (status != null) {
      params = params.append('status', status);
    }
    if (isBlacklisted != null) {
      params = params.append('isBlacklisted', isBlacklisted);
    }

    return this.http
      .get<DetailedInvite[]>(this.baseUrl + 'invites', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          result.result = response.body;
          if (response.headers.get('Pagination') != null) {
            result.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return result;
        })
      );
  }

  blacklistInvite(id: number, blacklist: boolean) {
    return this.http.put(
      this.baseUrl + 'blacklist/' + id + '?blacklist=' + blacklist,
      {}
    );
  }

  deleteInvite(id: number) {
    return this.http.delete(this.baseUrl + 'invite/' + id);
  }

  deleteAllInvites() {
    return this.http.delete(this.baseUrl + 'invites');
  }

  createInvites(model: Invite[]) {
    return this.http.post(this.baseUrl + 'invites', model);
  }

  getAccesses() {
    return this.http.get<Access[]>(this.baseUrl + 'accesses');
  }

  changeAccess(id: number, key: string) {
    return this.http.put(this.baseUrl + 'accesses/' + id + '?key=' + key, {});
  }

  createAdmin(username: string, key: string) {
    return this.http.post(
      this.baseUrl + 'createadmin?username=' + username + '&key=' + key,
      {}
    );
  }

  insertAnswerAdmin(id: number, invite: Invite) {
    return this.http.post(this.baseUrl + 'rsvp/' + id, invite);
  }
}
