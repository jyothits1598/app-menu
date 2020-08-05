import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupEmailRedirectComponent } from './views/signup-email-redirect/signup-email-redirect.component';
import { RestApiService } from './services/rest-api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './_directives/alert/alert.component';
import { AuthGuard } from './_guards';
import { DatePipe } from '@angular/common';
// import { ResendEmailComponent } from './views/resend-email/resend-email.component';

// import { PendingApprovalComponent } from './views/pending-approval/pending-approval.component';
// import { SideNavBarComponent } from './views/side-nav-bar/side-nav-bar.component';
// import { AddStoreFormsComponent } from './views/add-store-forms/add-store-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    SignupEmailRedirectComponent,
    AlertComponent,
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
  providers: [AlertService,RestApiService,AuthGuard,AuthenticationService, DatePipe],
  bootstrap: [AppComponent],
  exports: [FormsModule]
})
export class AppModule { }
