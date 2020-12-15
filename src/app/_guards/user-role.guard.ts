import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { map, tap } from 'rxjs/operators';
import { UserRole } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class OwnerRoleGuard implements CanActivate {
  constructor(private authService: AuthenticationService
    , private router: Router) {
  }
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.getUserObject().pipe(
      tap(user => { if (user.role !== UserRole.Owner) this.router.navigate(['/dashboard/unauthorized']) }),
      map((user) => {
        return user.role == UserRole.Owner;
      })
    )
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private authService: AuthenticationService
    , private router: Router) {
  }
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.getUserObject().pipe(
      tap(user => { if (user.role !== UserRole.Admin) this.router.navigate(['/dashboard/unauthorized']) }),
      map((user) => {
        return user.role === UserRole.Admin || user.role === UserRole.Staff;
      })
    )
  }
}
@Injectable({
  providedIn: 'root'
})
export class StaffRoleGuard implements CanActivate {
  constructor(private authService: AuthenticationService
    , private router: Router) {
  }
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.getUserObject().pipe(
      tap(user => { if ((user.role !== UserRole.Admin) && (user.role !== UserRole.Staff)) this.router.navigate(['/dashboard/unauthorized']) }),
      map((user) => {
        return user.role === UserRole.Admin || user.role === UserRole.Staff;
      })
    )
  }
}
