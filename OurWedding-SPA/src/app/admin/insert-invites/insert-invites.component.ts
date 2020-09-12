import { AlertService } from './../../_services/alert.service';
import { AdminService } from './../../_services/admin.service';
import { Invite } from './../../_models/Invite';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-insert-invites',
  templateUrl: './insert-invites.component.html',
  styleUrls: ['./insert-invites.component.css'],
})
export class InsertInvitesComponent implements OnInit {
  invitesJson = '';

  constructor(
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  go() {
    console.log(this.invitesJson);
    const invites: Invite[] = JSON.parse(this.invitesJson);
    console.log(invites);
    this.adminService.createInvites(invites).subscribe(
      () => {
        this.invitesJson = '';
        this.alert.success('Convites Criados');
      },
      (error) => this.alert.danger(error)
    );
  }
}
