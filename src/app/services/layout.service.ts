import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, OnInit } from '@angular/core';
import { SideNavbarService } from './side-navbar.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sideMenuVisible: boolean = true;
  isMobile: boolean;

  matcher: MediaQueryList;

  constructor(private mediaMatcher: MediaMatcher,
    private sideBarService: SideNavbarService) {
    this.matcher = this.mediaMatcher.matchMedia('(min-width: 500px)');
    if (!this.matcher.matches) {
      this.isMobile = true;
      this.sideMenuVisible = false;
    } else {
      this.sideMenuVisible = true;
      this.isMobile = false;
    }

    this.matcher.addEventListener('change', (event) => {
      if (!event.matches) {
        this.isMobile = true;
        this.sideMenuVisible = false;
      }
      else {
        this.sideMenuVisible = true;
        this.isMobile = false;
      }
    });

    this.sideBarService.linkClicked.subscribe(
      () => {
        if(this.isMobile) this.sideMenuVisible = false;
      }
    );
  }



  toggleSideBar() {
    this.sideMenuVisible = !this.sideMenuVisible;
  }


}
