import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve, ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '../_models/store';
import { RestApiService } from '../services/rest-api.service';

@Injectable()
export class StoreMenuResolver implements Resolve<Store> {

    constructor(
        private storeService: StoreService,
        private restApiService: RestApiService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Store | Observable<Store> {
        return this.restApiService.getDataObs('store/' + route.paramMap.get('id')).pipe(
            map((resp) => {
                if (resp.data && resp.data[0]) {
                    let store = new Store(resp.data[0].store_id, resp.data[0].store_name, resp.data[0].active_flag ? true : false);
                    this.storeService.activeStore = resp.data[0].store_id;
                    this.storeService.activeStore$.next(store);
                    return store
                } else {
                    this.router.navigate(['dashboard/partner/not-found']);
                    this.storeService.activeStore$.next(null);
                    throwError(null);
                }
            })
        )
    }

}