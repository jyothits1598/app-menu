import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
declare var $:any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  showLoader:boolean = false;
  private unsubscribe$ = new Subject();
  showNotificationStatus = false;
  showNotificationMessage:string = '';
  notification_color:any = '#1A1A1A';
  showAlertBottomNotificationStatus = false;
  showAlertBottomNotificationMessage:string = '';

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.alertService.getNotification().subscribe(({message:message,alertType:alertType})=>{
      this.showNotificationMessage='';
      if(message){
          if(alertType=='error'){
            this.notification_color = 'red';
          }else if(alertType=='success'){
            this.notification_color = '#1A1A1A';
          }else{
            this.notification_color = '#1A1A1A';
          }
          this.showNotificationMessage= message;
          this.showNotificationStatus = true;
          setTimeout(()=>{this.showNotificationStatus = false; }, 7000)
      }
  });

  this.alertService.getAlertBottomNotification().subscribe((message:string)=>{
      this.showAlertBottomNotificationMessage='';
      if(message){
          this.showAlertBottomNotificationMessage= message;
          this.showAlertBottomNotificationStatus = true;
          setTimeout(()=>{this.showAlertBottomNotificationStatus = false; }, 7000)
      }
  });

    this.alertService.getLoaderDetails().subscribe((message:boolean)=>{
      this.showLoader = message;
  });
  }
/*
  * Close alert Bottom notification
  */
 closeAlertbottomNotifcation(){
  this.showAlertBottomNotificationStatus = false;
}
  /*
  * default Angular Destroy Method
  */
 ngOnDestroy(){
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

/*
  * close notification
  */
  hideNotification(){
    this.showNotificationStatus = false;
  }
}
