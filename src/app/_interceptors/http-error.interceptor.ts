import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.error && error.error.error){
                    this.alertService.showNotification(this.readErrorMessage(error.error.error), 'error')
                }
                return throwError(error);
            })
        )
    }

    readErrorMessage(error: any){
        console.log('inside error');
        for(var err in error){
            return `${error[err]}` 
        }
    }
}