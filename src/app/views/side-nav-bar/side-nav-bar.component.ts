import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
import { SidebarTemplate } from 'src/app/_models/sidebar-template';
import { MediaMatcher } from '@angular/cdk/layout'

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {

  dashboard_status: boolean = false;
  menu_status: boolean = false;
  
  constructor(
    private authenticateService: AuthenticationService,
    private sideNavBarService: SideNavbarService,
    private mediaMatcher: MediaMatcher
    ) { }
    
  toggleVisibility() {

  }

  get sideBarTemplates(): Array<SidebarTemplate> {
    return this.sideNavBarService.templates;
  }

  ngOnInit(): void {

  }

  /*
   * Logout function 
   */
  logout() {
    this.authenticateService.logout();
  }
}
