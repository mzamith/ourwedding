import { WelcomeComponent } from './welcome/welcome.component';
// import { PreventUnsavedChangesGuard } from './_guard/prevent-unsaved-changes.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

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
        // resolve: { users: MemberListResolver },
      },
      {
        path: 'rsvp',
        component: HomeComponent,
        // resolve: { users: MemberListResolver },
        data: { roles: ['Admin', 'Moderator'] },
      },
      {
        path: 'admin',
        component: HomeComponent,
        data: { roles: ['Admin'] },
        // resolve: { users: MemberListResolver },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];