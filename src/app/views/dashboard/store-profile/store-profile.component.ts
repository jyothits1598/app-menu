import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserRole } from 'src/app/_models/user';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit {
  isOwner: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authService.userObjectSubject.value.role == UserRole.Owner) this.isOwner = true;
  }

}
