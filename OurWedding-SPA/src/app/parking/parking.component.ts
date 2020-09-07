import { Recommendation } from './../_models/Recommendation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent implements OnInit {
  @Input() recommendations: Recommendation[];

  constructor() {}

  ngOnInit() {
    console.log(this.recommendations);
  }
}
