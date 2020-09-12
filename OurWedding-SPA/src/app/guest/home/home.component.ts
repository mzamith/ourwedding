import { Recommendation } from './../../_models/Recommendation';
import { SimpleInvite } from './../../_models/SimpleInvite';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  invite: SimpleInvite;
  recommendations: Recommendation[];

  ngOnInit() {
    this.invite = this.authService.currentInvite;
    this.route.data.subscribe((data) => {
      this.recommendations = data['recommendations'];
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  logout(): void {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentInvite = null;
  }
}
