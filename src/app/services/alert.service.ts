import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/filter';

declare var alert:any;

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private loader = new Subject();
  private notification = new Subject();
  private keepAfterRouteChange = false;
  private bottomNotification = new Subject();
  constructor() {
   }
  
   showNotification(message: string, alertType?: string){
    this.notification.next({message:message, alertType: alertType});
  }

  getNotification(){
    return this.notification.asObservable();
  }

  showAlertBottomNotification(message:string){
    this.bottomNotification.next(message);
  }

  getAlertBottomNotification(){
    return this.bottomNotification.asObservable();
  }

  showLoader(){
    this.loader.next(true);
  }

  hideLoader(){
    this.loader.next(false);
  }
  
  getLoaderDetails(){
    return this.loader.asObservable();
  }

 
}
