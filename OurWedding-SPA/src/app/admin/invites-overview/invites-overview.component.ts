import { DetailedInvite } from './../../_models/DetailedInvite';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invites-overview',
  templateUrl: './invites-overview.component.html',
  styleUrls: ['./invites-overview.component.css'],
})
export class InvitesOverviewComponent implements OnInit {
  invites: DetailedInvite[];
  brideGuests: any[] = [];
  groomGuests: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.invites = data['invites'].result;
    });
    this.filterGuests();
  }

  filterGuests() {
    this.invites.forEach((i) => {
      i.invitees.forEach((iv) => {
        if (iv.inviteeAnswers.length > 0) {
          iv.inviteeAnswers.forEach((ia) => {
            if (i.team === 'GROOM') {
              this.groomGuests.push({
                name: iv.name,
                status: ia.isAttending ? 'Sim' : 'Não',
              });
            } else {
              this.brideGuests.push({
                name: iv.name,
                status: ia.isAttending ? 'Sim' : 'Não',
              });
            }
          });
        } else {
          if (i.team === 'GROOM') {
            this.groomGuests.push({ name: iv.name, status: 'Pendente' });
          } else {
            this.brideGuests.push({ name: iv.name, status: 'Pendente' });
          }
        }
      });
    });
  }

  filterAttendence(statusList: any[], key: string) {
    return statusList.filter((sl) => sl.status === key);
  }

  answeredInvites() {
    return this.invites.filter((i) => i.inviteAnswers.length > 0);
  }
}
