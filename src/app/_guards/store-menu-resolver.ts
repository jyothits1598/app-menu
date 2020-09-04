import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router, Resolve } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Store } from '../_models/store';
import { RestApiService } from '../services/rest-api.service';

@Injectable()
export class StoreMenuResolver implements Resolve<Store> {

    constructor(
        private storeService: StoreService,
        private restApiService: RestApiService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Store | Observable<Store> {
        return this.restApiService.getDataObs('store/' + route.paramMap.get('id')).pipe(
            map((resp) => {
                if (resp.data && resp.data[0]) {
    console.log('resolver fucntion called');

                    let store = new Store(resp.data[0].store_id, resp.data[0].store_name, resp.data[0].active_flag ? true : false);
                    this.storeService.activeStore = resp.data[0].store_id;
                    this.storeService.activeStore$.next(store);
                    return store
                } else return null;
            })
        )
    }

}