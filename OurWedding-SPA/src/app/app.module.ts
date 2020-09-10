import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { NgbToastModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AlertComponent } from './alert/alert.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ParkingComponent } from './parking/parking.component';
import { RsvpPreviewComponent } from './rsvp-preview/rsvp-preview.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { PersonalMessageComponent } from './personal-message/personal-message.component';

import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { InviteService } from './_services/invite.service';
import { RecommendationService } from './_services/recommendation.service';
import { RecommendationsResolver } from './_resolvers/recommendations.resolver';
import { InviteResolver } from './_resolvers/invite.resolver';
import { AdminService } from './_services/admin.service';
import { AdminResolver } from './_resolvers/admin.resolver';

import { appRoutes } from './routes';

export function getToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    AlertComponent,
    JumbotronComponent,
    ScheduleComponent,
    ParkingComponent,
    RsvpPreviewComponent,
    RsvpComponent,
    AdminComponent,
    FooterComponent,
    PersonalMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
    NgbToastModule,
    NgbModalModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorInterceptorProvider,
    AlertService,
    RecommendationsResolver,
    RecommendationService,
    InviteService,
    InviteResolver,
    AdminService,
    AdminResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
