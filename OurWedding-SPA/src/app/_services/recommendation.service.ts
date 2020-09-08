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
}
