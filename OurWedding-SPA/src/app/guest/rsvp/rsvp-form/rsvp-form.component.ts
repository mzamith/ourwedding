import { AlertService } from './../../../_services/alert.service';
import { AuthService } from './../../../_services/auth.service';
import { Invite, Invitee } from './../../../_models/Invite';
import { SimpleInvite } from './../../../_models/SimpleInvite';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css'],
})
export class RsvpFormComponent implements OnInit {
  @Input() invite: Invite;
  @Output() updatedInvite = new EventEmitter<Invite>();
  @Output() canceled = new EventEmitter<boolean>();
  plusOneInvitee: Invitee;
  noMainGuestsAttend = true;
  addedAnInvitee = false;

  @ViewChild('rsvpForm', { static: true }) rsvpForm: NgForm;

  disableMap = {};

  constructor(private alert: AlertService) {}

  ngOnInit() {
    this.initAnswers();
    this.sortInvitees();
    this.createPlusOneInvitee();
    this.invite.invitees.forEach((element) => {
      element.inviteeAnswer.hasRestriction =
        element.inviteeAnswer.restriction != null &&
        element.inviteeAnswer.restriction.length > 0;
    });
    this.checkMainGuests(null, null);
  }

  cannotRSVP(guest: Invitee) {
    return this.disableMap[guest.id];
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
      this.noMainGuestsAttend = true;
      this.invite.inviteAnswer.wantsTransportation = false;
    } else {
      this.invite.invitees.forEach((i) => {
        this.disableMap[i.id] = false;
      });
      this.noMainGuestsAttend = false;
    }
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

        this.updatedInvite.emit(this.invite);
      }
    }
  }

  cancel() {
    this.canceled.emit(true);
  }
}
