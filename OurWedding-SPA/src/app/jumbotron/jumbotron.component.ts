import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
})
export class JumbotronComponent implements OnInit {
  @Input() welcomeMessage: any;

  constructor() {}

  ngOnInit() {}
}
