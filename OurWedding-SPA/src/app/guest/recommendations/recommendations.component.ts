import { Recommendation } from '../../_models/Recommendation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  @Input() recommendations: Recommendation[];

  constructor() {}

  ngOnInit() {}

  getParking() {
    return this.recommendations.filter((r) => r.category === 'PARKING');
  }

  getHotels() {
    return this.recommendations.filter((r) => r.category === 'HOTEL');
  }
}
