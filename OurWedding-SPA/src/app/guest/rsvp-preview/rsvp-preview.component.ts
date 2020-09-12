import { AuthService } from './../../_services/auth.service';
import { SimpleInvite } from './../../_models/SimpleInvite';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rsvp-preview',
  templateUrl: './rsvp-preview.component.html',
  styleUrls: ['./rsvp-preview.component.css'],
})
export class RsvpPreviewComponent implements OnInit {
  invite: SimpleInvite;
  cardContent: any = {};

  constructor(private authService: AuthService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.invite = this.authService.currentInvite;

    if (this.invite.answered) {
      this.cardContent.firstLine =
        'Temos todo o gosto em receber-vos no nosso dia...';
      this.cardContent.secondLine =
        'Para facilitar o nosso trabalho, por favor responde o mais cedo possível!';
      this.cardContent.button = 'Responder';
      this.cardContent.icon =
        'https://res.cloudinary.com/dp8csoo5l/image/upload/v1599662288/email_kmoytp.png';
    } else {
      this.cardContent.firstLine =
        'Já deste uma resposta no dia ' +
        this.datePipe.transform(this.invite.lastAnswered, 'shortDate');
      this.cardContent.secondLine = 'Podes sempre alterar a tua resposta!';
      this.cardContent.button = 'Editar';
      this.cardContent.icon =
        'https://res.cloudinary.com/dp8csoo5l/image/upload/v1599687328/letter_qczrny.png';
    }
  }
}
