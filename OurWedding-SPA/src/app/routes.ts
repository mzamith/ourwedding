import { AdminResolver } from './_resolvers/admin.resolver';
import { AdminComponent } from './admin/admin.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { RecommendationsResolver } from './_resolvers/recommendations.resolver';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
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
        // data: { roles: ['Admin', 'Moderator'] },
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { roles: ['Admin'] },
        resolve: { invites: AdminResolver },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
