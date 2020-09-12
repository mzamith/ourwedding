import { Recommendation } from './../_models/Recommendation';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  baseUrl: string = environment.apiUrl + 'recommendations';
  constructor(private http: HttpClient) {}

  getRecommendations() {
    return this.http.get(this.baseUrl);
  }

  deleteRecommendation(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  createRecommendation(model: Recommendation) {
    return this.http.post(this.baseUrl, model);
  }
}
