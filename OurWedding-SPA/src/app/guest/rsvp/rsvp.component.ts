import { NgForm } from '@angular/forms';
import { Invitee } from './../../_models/Invite';
import { AlertService } from './../../_services/alert.service';
import { InviteService } from './../../_services/invite.service';
import { SimpleInvite } from './../../_models/SimpleInvite';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Invite } from '../../_models/Invite';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  simpleInvite: SimpleInvite;
  invite: Invite;

  constructor(
    private authService: AuthService,
    private inviteService: InviteService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.simpleInvite = this.authService.currentInvite;
    this.route.data.subscribe((data) => {
      this.invite = data['invite'];
    });
  }

  logout(): void {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentInvite = null;
  }

  submit() {
    this.inviteService.postInvite(this.invite).subscribe(
      () => {
        this.simpleInvite.answered = true;
        this.simpleInvite.lastAnswered = new Date();
        localStorage.setItem('user', JSON.stringify(this.simpleInvite));
        if (
          this.invite.invitees.filter((i) => i.inviteeAnswer.isAttending)
            .length === 0
        ) {
          this.alert.default('Temos pena de não poderes vir :(');
        }
        this.alert.success('Obrigado pela resposta :)');
        this.router.navigate(['/home']);
      },
      (error) => this.alert.danger(error)
    );
  }

  onInviteSubmit(event: any) {
    this.invite = event;
    this.submit();
  }

  cancel(event: any) {
    this.router.navigate(['/home']);
  }
}
