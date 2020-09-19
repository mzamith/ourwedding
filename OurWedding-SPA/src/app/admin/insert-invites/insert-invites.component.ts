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
  invitesJsonDummy: string = JSON.stringify(
    [
      {
        UserName: 'USERNAME',
        AccessKey: 'KEY',
        Name: 'NAME',
        Created: new Date(),
        LastActive: new Date(),
        Team: 'GROOM',
        WelcomeMessage:
          'Bem, este é o nosso website, feito com muito amor e carinho para o noivo experimentar uma data de coisas que lhe dão jeito hehe. A ideia é dares uns cliques e dar-me sugestões de melhoria ou eventuais erros, uma vez que isto foi mesmo feito do nada. No futuro, esta secção vai ter um textinho fofo personalizado para cada convidado.',
        CanAddInvitee: false,
        Invitees: [
          {
            Name: 'NAME',
            IsMainGuest: true,
          },
        ],
      },
    ],
    undefined,
    4
  );

  invitesJson = '';

  constructor(
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.invitesJson = this.invitesJsonDummy;
  }

  go() {
    try {
      const invites: Invite[] = JSON.parse(this.invitesJson);
      this.adminService.createInvites(invites).subscribe(
        () => {
          this.invitesJson = this.invitesJsonDummy;
          this.alert.success('Convites Criados');
        },
        (error) => this.alert.danger(error)
      );
    } catch (error) {
      this.alert.danger("Can't parse json");
    }
  }
}
