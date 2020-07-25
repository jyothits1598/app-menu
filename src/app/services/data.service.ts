import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userId = new BehaviorSubject<number>(this.hasUserId());
  getCurrentUserId = this.userId.asObservable();

  private selectedRoleId = new BehaviorSubject<number>(this.hasRoleId());
  getSelectedId = this.selectedRoleId.asObservable();

  
  constructor() { }
 /*
  * Function to change user id
  */
 changeUserId(store_partner_id: number) {
  this.userId.next(store_partner_id)
  if(store_partner_id!=0){
    localStorage.setItem('logged_user_id',store_partner_id.toString());
  }else{
    localStorage.removeItem('logged_user_id');
  }
}
  /*
  * Function to check selected userId
  */
 hasUserId() {
  if(localStorage.getItem('logged_user_id')){
    return parseInt(localStorage.getItem('logged_user_id'));
  }
  return 0;
}


/*
  * Function to check selected role
  */
 hasRole(){
  if(localStorage.getItem('logged_role')){
    return localStorage.getItem('logged_role');
  }
  return '';
}

hasRoleId() {
  if(localStorage.getItem('role_id')){
    return parseInt(localStorage.getItem('role_id'));
  }
  return 0;
}

/*
  * Function to change role name
  */
 changeRoleId(roleId: number) {
  this.selectedRoleId.next(roleId);
  if(roleId!=0){
    localStorage.setItem('role_id',roleId.toString());
  }else{
    localStorage.removeItem('role_id');
  }
}

/*
  * Function to validate File size
  */
 validateFileSize(size : number){
  if(size<5242880)
      return true;

      return false;
}

/*
* Function to validate File type
*/
validateFileExtension(name: String) {
  name = name.toLowerCase();
  var ext = name.substring(name.lastIndexOf('.') + 1);
  if(ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'gif') {
    return true;
  }else {
    return false;
  }
}

}
