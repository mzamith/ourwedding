import { AuthService } from './../_services/auth.service';
import { SimpleInvite } from './../_models/SimpleInvite';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rsvp-preview',
  templateUrl: './rsvp-preview.component.html',
  styleUrls: ['./rsvp-preview.component.css'],
})
export class RsvpPreviewComponent implements OnInit {
  invite: SimpleInvite;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.invite = this.authService.currentInvite;
  }
}
