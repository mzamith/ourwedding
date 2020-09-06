import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AlertComponent } from './alert/alert.component';

import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';

import { appRoutes } from './routes';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

export function getToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, WelcomeComponent, HomeComponent, AlertComponent],
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
  ],
  providers: [AuthService, AuthGuard, ErrorInterceptorProvider, AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
