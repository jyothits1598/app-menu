import { RestApiService } from 'src/app/services/rest-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreProfileDataService {

  constructor(private restApiService: RestApiService) { }

  dumm(){
    console.log('dummy function called ');
  }

  
}
