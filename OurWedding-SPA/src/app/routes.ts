import { InvitesOverviewComponent } from './admin/invites-overview/invites-overview.component';
import { InsertRecommendationComponent } from './admin/insert-recommendation/insert-recommendation.component';
import { InsertInvitesComponent } from './admin/insert-invites/insert-invites.component';
import { ManageInvitesComponent } from './admin/manage-invites/manage-invites.component';
import { ManageRecommendationsComponent } from './admin/manage-recommendations/manage-recommendations.component';
import { AdminResolver } from './_resolvers/admin.resolver';
import { AdminComponent } from './admin/admin.component';
import { RsvpComponent } from './guest/rsvp/rsvp.component';
import { RecommendationsResolver } from './_resolvers/recommendations.resolver';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './guest/home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { InviteResolver } from './_resolvers/invite.resolver';

export const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: { recommendations: RecommendationsResolver },
      },
      {
        path: 'rsvp',
        component: RsvpComponent,
        resolve: { invite: InviteResolver },
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { roles: ['Admin'] },
        children: [
          {
            path: '',
            redirectTo: 'invites',
            pathMatch: 'full',
          },
          {
            path: 'invites',
            component: ManageInvitesComponent,
            data: { roles: ['Admin'] },
            resolve: { invites: AdminResolver },
            outlet: 'admin',
          },
          {
            path: 'overview',
            component: InvitesOverviewComponent,
            data: { roles: ['Admin'] },
            resolve: { invites: AdminResolver },
            outlet: 'admin',
          },
          {
            path: 'createinvites',
            component: InsertInvitesComponent,
            data: { roles: ['Admin'] },
            outlet: 'admin',
          },
          {
            path: 'recommendations',
            component: ManageRecommendationsComponent,
            resolve: { recommendations: RecommendationsResolver },
            outlet: 'admin',
          },
          {
            path: 'createrecommendations',
            component: InsertRecommendationComponent,
            outlet: 'admin',
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
