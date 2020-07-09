import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private roleId:number;
    private unsubscribe$ = new Subject();
    
    constructor(
        private router: Router,
        private authenticationService:AuthenticationService,
        private location:Location,
        private dataService: DataService,
        private activatedRoute: ActivatedRoute
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        if(this.authenticationService.isLoggedIn()){
            this.dataService.getSelectedId.subscribe((seleted_id)=>{
                this.roleId=seleted_id;
            });
            const permission = route.data["permission"];
            if(this.roleId && permission && permission.length>0 && permission.indexOf(this.roleId) != -1){
                return this.authenticationService.isLoggedIn();
            }
            //alert('Permission denied');
            this.location.back();
            return false;
        }else{
            this.router.navigate(['/login'], {queryParams: {'returnUrl':state.url}});
            return this.authenticationService.isLoggedIn();
        }
    }

    /*
    * default Angular Destroy Method
    */
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
  }
