import { AlertService } from './../_services/alert.service';
import { RecommendationService } from './../_services/recommendation.service';
import { Recommendation } from './../_models/Recommendation';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecommendationsResolver implements Resolve<Recommendation[]> {
  constructor(
    private recommendationService: RecommendationService,
    private alert: AlertService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recommendation[]> {
    return this.recommendationService.getRecommendations().pipe(
      catchError((error) => {
        this.alert.danger(error);
        return of(null);
      })
    );
  }
}
