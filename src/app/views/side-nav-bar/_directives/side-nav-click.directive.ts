import { Directive, HostListener } from '@angular/core';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
;

@Directive({
  selector: '[appSideNavClick]'
})
export class SideNavClickDirective {
  @HostListener('click', ['$event'])
  onMouseEnter(event: any) {   
    this.sideNavBarServ.onLinkClick();
  }
  constructor(private sideNavBarServ: SideNavbarService) { }

}
