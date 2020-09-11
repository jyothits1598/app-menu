import { RestApiService } from 'src/app/services/rest-api.service';
import { Injectable } from '@angular/core';
import { URL_StoreBasicData, URL_StoreImage, URL_StoreBankData, URL_StoreOwnershipData } from 'src/environments/api/api-store-administration';
import { tap, map, flatMap } from 'rxjs/operators';
import { Observable, of, throwError, Subscriber } from 'rxjs';
import { StoreBasicDetails } from '../_model/store-basic-details';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from 'src/app/services/alert.service';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { StoreBankDetails } from '../_model/store-bank-details';
import { StoreOwnershipDetails } from '../_model/store-ownership-details';

@Injectable()
export class StoreProfileDataService {

  constructor(private restApiService: RestApiService,
    private dataService: DataService,
    private alertService: AlertService,
    private stringHelper: StringHelperService) { }

  GetStoreBasicData(storeId): Observable<StoreBasicDetails> {
    return this.restApiService.getDataObs(URL_StoreBasicData(storeId)).pipe(
      map((resp: any) => {
        let data = resp.data[0];
        let store = new StoreBasicDetails();
        store.name = data.store_name;
        store.address = data.store_address;
        store.cuisineType = data.type_of_cuisine;
        store.description = data.description;
        store.facebookUrl = data.facebook_url;
        store.googleUrl = data.google_business_url;
        store.imageUrl = data.store_logo;
        return store;
      })
    )
  }

  SaveStoreBasicData(storeDetails: StoreBasicDetails): Observable<any> {
    let data = {
      'store_name': storeDetails.name,
      'store_address': storeDetails.address,
      'type_of_cuisine': storeDetails.cuisineType,
      'description': storeDetails.description,
      'google_business_url': storeDetails.googleUrl,
      'facebook_url': storeDetails.facebookUrl,
      'store_logo': storeDetails.imageUrl ? this.stringHelper.ExtractFileName(storeDetails.imageUrl) : null
    };
    return this.restApiService.putData(URL_StoreBasicData(storeDetails.id), data);
  }

  GetStoreBankData(storeId): Observable<StoreBankDetails>{
    return this.restApiService.getDataObs(URL_StoreBankData(storeId)).pipe(
      map((resp)=>{
        let data = resp.data[0];
        let bankDetail = new StoreBankDetails();
        bankDetail.name = data.bank;
        bankDetail.accountName = data.bank_account_name;
        bankDetail.bsbNumber = data.bsb_number;
        bankDetail.accountNumber = data.bank_account_number;
        return bankDetail;
      })
    );
  }

  SaveStoreBankData(bankDetails: StoreBankDetails): Observable<any> {
    let data = {
      'bank':bankDetails.name,
      'bank_account_name':bankDetails.accountName,
      'bsb_number':bankDetails.bsbNumber,
      'bank_account_number':bankDetails.accountNumber
    };
    return this.restApiService.putData(URL_StoreBankData(bankDetails.id), data);
  }

  GetStoreOwnershipData(storeId): Observable<StoreOwnershipDetails>{
    return this.restApiService.getDataObs(URL_StoreOwnershipData(storeId)).pipe(
      map((resp)=>{
        console.log(resp);
        let data = resp.data[0];
        let StoreOwnershipDetail = new StoreOwnershipDetails();
        StoreOwnershipDetail.ownerName = data.legal_owner_name;
        StoreOwnershipDetail.buinessName = data.legal_business_name;
        StoreOwnershipDetail.registrationNumber = data.business_register_number;
        StoreOwnershipDetail.legalFile = data.certificate_of_registration;
        return StoreOwnershipDetail;
      })
    );
  }

  SaveownershipData(ownershipDetails: StoreOwnershipDetails): Observable<any> {
    let data = {
      'legal_owner_name':ownershipDetails.ownerName,
      'legal_business_name':ownershipDetails.buinessName,
      'business_register_number':ownershipDetails.registrationNumber,
      'certificate_of_registration':ownershipDetails.legalFile
    };
    return this.restApiService.putData(URL_StoreOwnershipData(ownershipDetails.id), data);
  }

  SaveStoreLogo(file: File): Observable<any> {
    /* File upload Required function */
    if (!this.dataService.validateFileExtension(file.name)) {
      this.alertService.showNotification('Selected file format is not supported', 'error');
      return throwError(false);
    }
    if (!this.dataService.validateFileSize(file.size)) {
      this.alertService.showNotification('File to be uploaded should be less than 5MB', 'error');
      return throwError(false);
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let fileObs: Observable<File> = Observable.create((observer): void => {
      // if success
      reader.onload = ((e: any): void => {
        var image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          if (image.width < 500 || image.height < 500) {
            this.alertService.showNotification('Minimum size 500*500 pixel', 'error')
            observer.error(false)
          }
          else {
            observer.next(file);
            observer.complete();
          }
        }
      })
    });

    return fileObs.pipe(flatMap((file: File) => {
      let formData = new FormData();
      formData.append('store_image', file);
      return this.restApiService.postData(URL_StoreImage, formData);
    })).pipe((map(
      (resp: any) => resp.data
    )))
  }
}

