import { AlertService } from './../../_services/alert.service';
import { AdminService } from './../../_services/admin.service';
import { Access } from './../../_models/Access';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  submitted = false;
  insertAdminForm: FormGroup;
  access: Access;

  constructor(
    private adminService: AdminService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.insertAdminForm = this.fb.group({
      username: ['', Validators.required],
      accessKey: ['', Validators.required],
    });
  }

  submit() {
    if (this.insertAdminForm.valid) {
      this.access = Object.assign({}, this.insertAdminForm.value);
      console.log(this.access);
      this.adminService
        .createAdmin(this.access.username, this.access.accessKey)
        .subscribe(
          () => {
            this.alert.success('Utilizador criado');
            this.submitted = false;
            this.insertAdminForm.reset();
          },
          (error) => this.alert.danger(error)
        );
    } else {
      this.submitted = true;
    }
  }
}
