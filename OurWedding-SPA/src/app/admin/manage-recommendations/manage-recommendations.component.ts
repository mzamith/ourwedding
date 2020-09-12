import { AlertService } from './../../_services/alert.service';
import { RecommendationService } from './../../_services/recommendation.service';
import { Recommendation } from './../../_models/Recommendation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-recommendations',
  templateUrl: './manage-recommendations.component.html',
  styleUrls: ['./manage-recommendations.component.css'],
})
export class ManageRecommendationsComponent implements OnInit {
  recommendations: Recommendation[];

  constructor(
    private route: ActivatedRoute,
    private recommendationService: RecommendationService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.recommendations = data['recommendations'];
    });
  }

  deleteRecommendation(id: number) {
    this.recommendationService.deleteRecommendation(id).subscribe(
      () => {
        this.reloadRecommendations();
        this.alert.success('Eliminado com sucesso');
      },
      (error) => this.alert.danger('Error deleting recommendation')
    );
  }

  reloadRecommendations() {
    this.recommendationService
      .getRecommendations()
      .subscribe((recoms: Recommendation[]) => {
        this.recommendations = recoms;
      });
  }
}
