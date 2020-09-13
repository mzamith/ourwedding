import { AlertService } from './../../_services/alert.service';
import { AdminService } from './../../_services/admin.service';
import { Invite } from './../../_models/Invite';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-rsvp',
  templateUrl: './admin-rsvp.component.html',
  styleUrls: ['./admin-rsvp.component.css'],
})
export class AdminRsvpComponent implements OnInit {
  invite: Invite;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.invite = data['invite'];
    });
  }

  onInviteSubmit(event: any) {
    this.adminService.insertAnswerAdmin(this.invite.id, this.invite).subscribe(
      () => {
        this.alert.success('Sucesso');
        this.router.navigateByUrl('/admin/(admin:invites)');
      },
      (error) => this.alert.danger(error)
    );
  }

  cancel(event: any) {
    this.router.navigateByUrl('/admin/(admin:invites)');
  }
}
