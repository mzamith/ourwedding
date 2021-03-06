import { InviteAnswer } from './../../_models/Invite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../_services/alert.service';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import {
  DetailedInvite,
  DetailedInvitee,
} from './../../_models/DetailedInvite';
import { Pagination } from './../../_models/pagination';

@Component({
  selector: 'app-manage-invites',
  templateUrl: './manage-invites.component.html',
  styleUrls: ['./manage-invites.component.css'],
})
export class ManageInvitesComponent implements OnInit {
  invites: DetailedInvite[];
  invitesMemory: DetailedInvite[];
  selectedInvite: DetailedInvite;
  pagination: Pagination;

  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.invites = data['invites'].result;
      this.invitesMemory = data['invites'].result;
      this.pagination = data['invites'].pagination;
    });
  }

  getCurrentAnswer(invite: DetailedInvite) {
    return invite.inviteAnswers.find((ia) => ia.status !== 'H');
  }

  getCurrentAttendence(invitee: DetailedInvitee) {
    const attendence = invitee.inviteeAnswers.find((ia) => ia.status !== 'H');
    return attendence === undefined
      ? ''
      : attendence.isAttending
      ? 'Sim'
      : 'Não';
  }

  getCurrentRestriction(invitee: DetailedInvitee) {
    return invitee.inviteeAnswers.find((ia) => ia.status !== 'H')?.restriction;
  }

  getCurrentTransport(invite: DetailedInvite) {
    return invite.inviteAnswers.find((ia) => ia.status !== 'H')
      ?.wantsTransportation;
  }

  filterInvites(key: string) {
    if (key === 'BRIDE' || key === 'GROOM') {
      this.invites = this.invitesMemory.filter((i) => i.team === key);
    } else if (key === 'PENDING') {
      this.invites = this.invitesMemory.filter(
        (i) => i.inviteAnswers.length === 0
      );
    } else if (key === 'ANSWERED') {
      this.invites = this.invitesMemory.filter(
        (i) => i.inviteAnswers.length > 0
      );
    } else {
      this.invites = this.invitesMemory;
    }
  }
  openScrollableContent(longContent, invite: DetailedInvite) {
    this.selectedInvite = invite;
    this.modalService.open(longContent, { scrollable: true, size: 'lg' });
  }

  sortedAnswers(invite: DetailedInvite) {
    return invite.inviteAnswers.sort((ia1, ia2) => {
      return (
        new Date(ia2.answerDate).getTime() - new Date(ia1.answerDate).getTime()
      );
    });
  }

  sortedInviteeAnswers(invitee: DetailedInvitee) {
    return invitee.inviteeAnswers.sort((ia1, ia2) => {
      return (
        new Date(ia2.answerDate).getTime() - new Date(ia1.answerDate).getTime()
      );
    });
  }

  deleteInvite(id: number) {
    const conf = confirm('De certeza?');
    if (conf) {
      this.adminService.deleteInvite(id).subscribe(() => {
        this.reloadInvites();
        this.alert.success('Convite Apagado');
      });
    }
  }

  deleteAllInvites() {
    const conf = confirm('De certeza?');
    if (conf) {
      this.adminService.deleteAllInvites().subscribe(
        () => {
          this.reloadInvites();
          this.alert.success('Crash and burn database');
        },
        (error) => this.alert.danger(error)
      );
    }
  }

  reloadInvites() {
    this.adminService.getInvites().subscribe(
      (result) => {
        this.invites = result.result;
      },
      (error) => this.alert.danger(error)
    );
  }

  isAdminAnswer(answers: InviteAnswer[]) {
    if (answers.length === 0) {
      return false;
    }
    return answers.filter((a) => a.status === 'A').length > 0;
  }
}
