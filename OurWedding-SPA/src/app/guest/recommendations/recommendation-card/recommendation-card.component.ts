import { Recommendation } from './../../../_models/Recommendation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.css'],
})
export class RecommendationCardComponent implements OnInit {
  @Input() recommendation: Recommendation;
  @Input() priceTag: string;

  constructor() {}

  ngOnInit() {}
}
