import { AlertService } from './../_services/alert.service';
import { AdminService } from './../_services/admin.service';
import { AuthService } from './../_services/auth.service';
import { DetailedInvite, DetailedInvitee } from './../_models/DetailedInvite';
import { Pagination } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  invites: DetailedInvite[];
  invitesMemory: DetailedInvite[];
  selectedInvite: DetailedInvite;
  pagination: Pagination;
  toggled = false;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.invites = data['invites'].result;
      this.invitesMemory = data['invites'].result;
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
    return invite.inviteAnswers.find((ia) => ia.status === 'V');
  }

  getCurrentAttendence(invitee: DetailedInvitee) {
    return invitee.inviteeAnswers.find((ia) => ia.status === 'V')?.isAttending;
  }

  getCurrentRestriction(invitee: DetailedInvitee) {
    return invitee.inviteeAnswers.find((ia) => ia.status === 'V')?.restriction;
  }

  blacklist(id: number, blacklist: boolean) {
    this.adminService.blacklistInvite(id, blacklist).subscribe(
      () => {
        this.alert.success('Sucesso');
        this.invites.find((i) => i.id === id).isBlacklisted = blacklist;
      },
      (error) => this.alert.danger(error)
    );
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
    } else if (key === 'CONFIRMED') {
      this.invites = this.invitesMemory.filter((i) => {
        i.invitees.forEach((iv) => {
          if (
            iv.isMainGuest &&
            iv.inviteeAnswers.filter((ia) => ia.isAttending).length > 0
          ) {
            return true;
          }
        });
      });
    } else if (key === 'DECLINED') {
      this.invites = this.invitesMemory.filter((i) => {
        i.invitees.forEach((iv) => {
          if (
            iv.isMainGuest &&
            iv.inviteeAnswers.filter((ia) => ia.isAttending).length === 0
          ) {
            return true;
          }
        });
      });
    } else {
      this.invites = this.invitesMemory;
    }
  }
  openScrollableContent(longContent, invite: DetailedInvite) {
    this.selectedInvite = invite;
    this.modalService.open(longContent, { scrollable: true, size: 'lg' });
  }
}
