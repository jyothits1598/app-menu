import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { map, tap } from 'rxjs/operators';
import { User, UserRole } from '../_models/user';

@Injectable()
export class AuthGuard implements CanActivate {
    private roleId: number;
    private unsubscribe$ = new Subject();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authenticationService.getUserObject().pipe(
            tap(user => {
                if (route.children.length == 0) {
                    //evaluate roles
                    if(!this.authenticationService.isLoggedIn()) this.router.navigate(['/login']);
                    else{
                        if (user.role == UserRole.Admin) { this.router.navigate(['/dashboard/admin'])}
                        if (user.role == UserRole.Owner) { this.router.navigate(['/dashboard/partner'])}
                    }
                }
            }
            ),
            map((user) => {
                
                return this.authenticationService.isLoggedIn();
            })
        );
        // if (this.authenticationService.isLoggedIn()) {

        //     return true;
        // } else {
        //     this.router.navigate(['/login'], { queryParams: { 'returnUrl': state.url } });
        //     return this.authenticationService.isLoggedIn();
        // }
    }

    /*
    * default Angular Destroy Method
    */
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
