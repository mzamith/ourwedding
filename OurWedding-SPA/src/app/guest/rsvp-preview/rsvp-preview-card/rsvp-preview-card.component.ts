import { SimpleInvite } from './../../../_models/SimpleInvite';
import { Invite } from './../../../_models/Invite';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rsvp-preview-card',
  templateUrl: './rsvp-preview-card.component.html',
  styleUrls: ['./rsvp-preview-card.component.css'],
})
export class RsvpPreviewCardComponent implements OnInit {
  @Input() invite: SimpleInvite;
  @Input() content: any;

  constructor() {}

  ngOnInit() {}
}
