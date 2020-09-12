import { AuthService } from '../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-message',
  templateUrl: './personal-message.component.html',
  styleUrls: ['./personal-message.component.css'],
})
export class PersonalMessageComponent implements OnInit {
  message: string;
  name: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.message = this.authService.currentInvite.welcomeMessage;
    this.name = this.authService.currentInvite.name;
  }
}
