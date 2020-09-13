import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { JwtModule } from '@auth0/angular-jwt';
import { NgbToastModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './guest/home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AlertComponent } from './alert/alert.component';
import { JumbotronComponent } from './guest/jumbotron/jumbotron.component';
import { ScheduleComponent } from './guest/schedule/schedule.component';
import { RecommendationsComponent } from './guest/recommendations/recommendations.component';
import { RsvpPreviewComponent } from './guest/rsvp-preview/rsvp-preview.component';
import { RsvpComponent } from './guest/rsvp/rsvp.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './guest/footer/footer.component';
import { PersonalMessageComponent } from './guest/personal-message/personal-message.component';
import { ManageRecommendationsComponent } from './admin/manage-recommendations/manage-recommendations.component';
import { ManageInvitesComponent } from './admin/manage-invites/manage-invites.component';
import { InsertInvitesComponent } from './admin/insert-invites/insert-invites.component';
import { InsertRecommendationComponent } from './admin/insert-recommendation/insert-recommendation.component';
import { InvitesOverviewComponent } from './admin/invites-overview/invites-overview.component';
import { RecommendationCardComponent } from './guest/recommendations/recommendation-card/recommendation-card.component';
import { RsvpPreviewCardComponent } from './guest/rsvp-preview/rsvp-preview-card/rsvp-preview-card.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { ManageAccessesComponent } from './admin/manage-accesses/manage-accesses.component';
import { RsvpFormComponent } from './guest/rsvp/rsvp-form/rsvp-form.component';
import { AdminRsvpComponent } from './admin/admin-rsvp/admin-rsvp.component';

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
import { AdminAccessesResolver } from './_resolvers/admin-accesses.resolver';
import { AdminInviteResolver } from './_resolvers/admin.invite.resolver';

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
    RecommendationsComponent,
    RsvpPreviewComponent,
    RsvpComponent,
    AdminComponent,
    FooterComponent,
    PersonalMessageComponent,
    ManageRecommendationsComponent,
    ManageInvitesComponent,
    InsertInvitesComponent,
    InsertRecommendationComponent,
    InvitesOverviewComponent,
    RecommendationCardComponent,
    RsvpPreviewCardComponent,
    ManageAccessesComponent,
    CreateAdminComponent,
    RsvpFormComponent,
    AdminRsvpComponent,
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
    AdminAccessesResolver,
    AdminInviteResolver,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
