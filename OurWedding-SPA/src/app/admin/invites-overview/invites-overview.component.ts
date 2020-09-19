import { DetailedInvite } from './../../_models/DetailedInvite';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CsvService } from 'src/app/_services/csv.service';

@Component({
  selector: 'app-invites-overview',
  templateUrl: './invites-overview.component.html',
  styleUrls: ['./invites-overview.component.css'],
})
export class InvitesOverviewComponent implements OnInit {
  invites: DetailedInvite[];
  brideGuests: any[] = [];
  groomGuests: any[] = [];

  constructor(private csvService: CsvService, private route: ActivatedRoute) {}

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
            if (ia.status !== 'H') {
              if (i.team === 'GROOM') {
                this.groomGuests.push({
                  name: iv.name,
                  status: ia.isAttending ? 'Sim' : 'Não',
                  invite: i.id,
                });
              } else {
                this.brideGuests.push({
                  name: iv.name,
                  status: ia.isAttending ? 'Sim' : 'Não',
                  invite: i.id,
                });
              }
            }
          });
        } else {
          if (i.team === 'GROOM') {
            this.groomGuests.push({
              name: iv.name,
              status: 'Pendente',
              invite: i.id,
            });
          } else {
            this.brideGuests.push({
              name: iv.name,
              status: 'Pendente',
              invite: i.id,
            });
          }
        }
      });
    });
  }

  flattenGuests(): any[] {
    const guests: any[] = [];

    this.invites.forEach((i) => {
      i.invitees.forEach((iv) => {
        const answer = i.inviteAnswers.find((ias) => ias.status !== 'H');
        if (answer) {
          const inviteeAnswer = iv.inviteeAnswers.find(
            (ias) => ias.status !== 'H'
          );
          if (inviteeAnswer.isAttending) {
            guests.push({
              invite: i.name,
              name: iv.name,
              comment: answer.comment,
              transport: answer.wantsTransportation,
              restriction: inviteeAnswer.restriction,
            });
          }
        }
      });
    });
    return guests;
  }

  export() {
    this.csvService.downloadFile(this.flattenGuests(), 'guests.csv');
  }

  filterAttendance(statusList: any[], key: string) {
    return statusList.filter((sl) => sl.status === key);
  }

  answeredInvites() {
    return this.invites.filter((i) => i.inviteAnswers.length > 0);
  }
}
