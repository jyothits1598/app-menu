import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ModalService } from 'src/app/views/shared/services/modal.service';

@Directive({
  selector: '[protectUnsaved]'
})

export class ProtectUnsavedDirective implements OnInit, OnDestroy {
  routerEveSubs: Subscription;
  destinationUrl: string;
  @Input() changed: Boolean;
  confirmed: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.routerEveSubs = this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(
      (startEvent: NavigationStart) => {
        console.log('navigation event', this.changed)

        if (this.changed && !this.confirmed) {
          this.destinationUrl = startEvent.url;

          //force the router to stay on the same route
          this.router.navigateByUrl(this.router.url);
          this.modalService.getConfirmation(
            { heading: 'Unsaved Changes', dialog: 'If you continue you will lose any unsaved changes', confirmBtn: 'Continue', declineBtn: 'Cancel' }
          ).subscribe(() => {
            this.confirmed = true;
            this.router.navigateByUrl(this.destinationUrl)
          })
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.routerEveSubs.unsubscribe();
  }

}
