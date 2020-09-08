import { AuthService } from './../_services/auth.service';
import { DetailedInvite, DetailedInvitee } from './../_models/DetailedInvite';
import { Pagination } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  invites: DetailedInvite[];
  pagination: Pagination;
  toggled = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.invites = data['invites'].result;
      this.pagination = data['invites'].pagination;
      console.log(this.invites);
    });
  }

  logout(): void {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentInvite = null;
  }

  toggle(event: any) {
    event.preventDefault();
    this.toggled = !this.toggled;
  }

  getCurrentAnswer(invite: DetailedInvite) {
    return invite.inviteAnswers.find((ia) => ia.status === 'V').answerDate;
  }

  getCurrentAttendence(invitee: DetailedInvitee) {
    return invitee.inviteeAnswers.find((ia) => ia.status === 'V').isAttending;
  }

  getCurrentRestriction(invitee: DetailedInvitee) {
    return invitee.inviteeAnswers.find((ia) => ia.status === 'V').restriction;
  }
}
