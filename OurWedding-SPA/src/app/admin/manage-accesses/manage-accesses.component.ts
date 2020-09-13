import { AlertService } from './../../_services/alert.service';
import { AdminService } from './../../_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Access } from './../../_models/Access';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-accesses',
  templateUrl: './manage-accesses.component.html',
  styleUrls: ['./manage-accesses.component.css'],
})
export class ManageAccessesComponent implements OnInit {
  acesses: Access[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.acesses = data['accesses'];
    });
    console.log(this.acesses);
  }

  getAcces(isAdmin: boolean) {
    return this.acesses.filter((a) => a.isAdmin === isAdmin);
  }

  blacklist(id: number, blacklist: boolean) {
    this.adminService.blacklistInvite(id, blacklist).subscribe(
      () => {
        this.alert.success('Sucesso');
        this.acesses.find((i) => i.id === id).isBlacklisted = blacklist;
      },
      (error) => this.alert.danger(error)
    );
  }
}
