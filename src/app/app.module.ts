import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupEmailRedirectComponent } from './views/signup-email-redirect/signup-email-redirect.component';
import { RestApiService } from './services/rest-api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './_directives/alert/alert.component';
import { AuthGuard } from './_guards';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpAuthErrorInterceptor } from './_interceptors/http-auth-error.interceptor';
import { HttpErrorInterceptor } from './_interceptors/http-error.interceptor';
import { MemberStoreInvitationComponent } from './views/member-store-invitation/member-store-invitation.component';
// import { PasswordResetComponent } from './views/password-reset/password-reset.component';
// import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
// import { TopNavBarComponent } from './views/top-nav-bar/top-nav-bar.component';

// import { PendingApprovalComponent } from './views/pending-approval/pending-approval.component';
// import { SideNavBarComponent } from './views/side-nav-bar/side-nav-bar.component';
// import { AddStoreFormsComponent } from './views/add-store-forms/add-store-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    SignupEmailRedirectComponent,
    AlertComponent,
    MemberStoreInvitationComponent,
    // PasswordResetComponent,
    // AdminDashboardComponent,
    // TopNavBarComponent
    // ResendEmailComponent,
    // PendingApprovalComponent,
    // SideNavBarComponent,
    // AddStoreFormsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AlertService,RestApiService,AuthGuard,AuthenticationService, DatePipe, 
  {
    provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthErrorInterceptor,
      multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
  },
  CurrencyPipe
  ],
  bootstrap: [AppComponent],
  exports: [FormsModule]
})
export class AppModule { }
