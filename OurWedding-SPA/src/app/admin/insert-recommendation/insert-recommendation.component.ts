import { AlertService } from './../../_services/alert.service';
import { RecommendationService } from './../../_services/recommendation.service';
import { Recommendation } from './../../_models/Recommendation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-insert-recommendation',
  templateUrl: './insert-recommendation.component.html',
  styleUrls: ['./insert-recommendation.component.css'],
})
export class InsertRecommendationComponent implements OnInit {
  recommendation: Recommendation;
  recommendationForm: FormGroup;
  submitted = false;

  constructor(
    private recommendationService: RecommendationService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.recommendationForm = this.fb.group({
      category: ['PARKING', Validators.required],
      photoUrl: ['', Validators.required],
      title: ['', Validators.required],
      address: ['', Validators.required],
      price: ['', Validators.required],
      mapCoordinates: ['', Validators.required],
    });
  }

  submit() {
    if (this.recommendationForm.valid) {
      this.recommendation = Object.assign({}, this.recommendationForm.value);
      console.log(this.recommendation);
      this.recommendationService
        .createRecommendation(this.recommendation)
        .subscribe(
          () => {
            this.alert.success('Recomendação criada');
            this.recommendationForm.reset();
            this.recommendationForm.get('category').setValue('Parking');
          },
          (error) => this.alert.danger(error)
        );
    } else {
      this.submitted = true;
    }
  }
}
