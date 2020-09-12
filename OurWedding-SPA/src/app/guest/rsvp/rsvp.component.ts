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
  plusOneInvitee: Invitee;
  plusOneDisabled = false;
  addedAnInvitee = false;

  @ViewChild('rsvpForm', { static: true }) rsvpForm: NgForm;

  disableMap = {};

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
      this.initAnswers();
      this.sortInvitees();
      this.createPlusOneInvitee();
    });
    this.invite.invitees.forEach((element) => {
      element.inviteeAnswer.hasRestriction =
        element.inviteeAnswer.restriction != null &&
        element.inviteeAnswer.restriction.length > 0;
    });
    this.checkMainGuests(null, null);
  }

  logout(): void {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentInvite = null;
  }

  submit() {
    if (this.rsvpForm.valid) {
      if (
        this.invite.invitees.filter(
          (i) => !i.isMainGuest && i.inviteeAnswer.isAttending
        ).length > 0 &&
        this.addedAnInvitee
      ) {
        this.alert.danger('Apenas podes levar um acompanhante.');
      } else {
        this.invite.invitees.forEach((i) => {
          if (!i.inviteeAnswer.hasRestriction) {
            i.inviteeAnswer.restriction = null;
          }
        });

        if (this.invite.canAddInvitee && this.addedAnInvitee) {
          this.invite.invitees.push(this.plusOneInvitee);
        }

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
    }
  }

  initAnswers() {
    if (this.invite.inviteAnswer == null) {
      this.invite.inviteAnswer = {
        id: null,
        status: null,
        comment: '',
        answerDate: new Date(),
        wantsTransportation: false,
      };
    }

    this.invite.invitees.forEach((i) => {
      if (i.inviteeAnswer == null) {
        i.inviteeAnswer = {
          id: 0,
          status: null,
          restriction: null,
          hasRestriction: false,
          isAttending: false,
          answerDate: new Date(),
        };
      }
    });
  }

  sortInvitees() {
    this.invite.invitees.sort((i1, i2) => {
      if (i1.isMainGuest) {
        return -1;
      }
      if (i2.isMainGuest) {
        return 1;
      }
      return 0;
    });
  }

  checkMainGuests(event, guest: Invitee) {
    if (event != null && guest != null) {
      this.invite.invitees.forEach((i) => {
        if (guest.id === i.id) {
          i.inviteeAnswer.isAttending = event.target.checked;
        }
      });
    }

    const numberOfAttendingMainGuests = this.invite.invitees.filter(
      (iv) => iv.inviteeAnswer.isAttending && iv.isMainGuest
    ).length;

    if (numberOfAttendingMainGuests === 0) {
      this.invite.invitees.forEach((i) => {
        i.inviteeAnswer.isAttending = false;
        this.disableMap[i.id] = !i.isMainGuest;
      });
      this.addedAnInvitee = false;
      this.plusOneDisabled = true;
    } else {
      this.invite.invitees.forEach((i) => {
        this.disableMap[i.id] = false;
      });
      this.plusOneDisabled = false;
    }
  }

  cannotRSVP(guest: Invitee) {
    return this.disableMap[guest.id];
  }

  createPlusOneInvitee() {
    if (this.invite.canAddInvitee) {
      this.plusOneInvitee = {
        id: 0,
        name: '',
        isMainGuest: false,
        isNew: true,
        inviteeAnswer: {
          id: 0,
          restriction: '',
          hasRestriction: false,
          isAttending: true,
          status: '',
          answerDate: new Date(),
        },
      };
    }
  }
}
