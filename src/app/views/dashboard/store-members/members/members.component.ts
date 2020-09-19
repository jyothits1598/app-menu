import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { REQUEST_A_ACTIVE } from 'src/environments/environment';
import { StoreService } from 'src/app/services/store.service';
import { ModalRef } from 'src/app/views/shared/_model/modal-ref';
import { ModalService } from 'src/app/views/shared/services/modal.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  invite_members_add_edit:string;
  memberRole = new Array();
  inviteMember: FormGroup;
  memberEmailSubmit = false;
  rolenameSubmitted = false;
  roleid:number;
  partnerId:number;
  store_id: string;
  closeResult: string;
  modalRef: ModalRef;
  errors = new Array();
  members_array = new Array();

  constructor(
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private modalServ: ModalService,
    private alertservice: AlertService
  ) { 
  }
  
  ngOnInit(): void {
    this.inviteMember = this.formBuilder.group({
      memberEmail: [null, [Validators.required, Validators.email]],
      roleName: ['', [Validators.required]]
    });
    var obj = this;
    obj.getRoledetails();
    obj.getmemberDetails();
      if (localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')) {
        let user_details = JSON.parse(localStorage.getItem('loggedUser'));
        if(user_details.user_details['store_partner_id']){
          this.partnerId = user_details.user_details['store_partner_id'];
        }
      }   
    }

    
  get f() { return this.inviteMember.controls;}

  get modalService(): NgbModal{
    return this._modalService;
  }

  mailRequestrole() {
    this.invite_members_add_edit = 'add';
  }

  showinviteTemplate(invite) {
    this.modalRef = this.modalServ.openTemplate(invite);
    this.invite_members_add_edit = 'add';
  }

  changeRole() {
    let roleDetails = this.inviteMember.value.roleName;
    console.log(roleDetails);
  }

  getRoledetails(){
    this.memberRole = [];
    this.restApiService.getData('api/stores/members/roles', (response) => {
      if (response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length > 0) {
        let data = response['data'];
        this.memberRole = data;
      }
    })
  }

  getmemberDetails(){
    this.alertservice.showLoader();
    this.members_array.length = 0;
    this.restApiService.getData(`api/stores/${this.storeService.activeStore}/members`,(response) => {
      if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length>0){
        this.members_array = response['data'];
      }
      this.alertservice.hideLoader();
    })
  }

  onSubmitinviteMember() {
    this.memberEmailSubmit = true;
    this.rolenameSubmitted = true;
    if(this.invite_members_add_edit=='add'){
      if(this.inviteMember.valid) {
        let data={
          'email':this.inviteMember.value.memberEmail,
          'store_member_role_id': this.inviteMember.value.roleName.store_member_role_id,
          'store_partner_id':this.partnerId,
          'next_url':REQUEST_A_ACTIVE
        };
        this.alertservice.showLoader();
        this.restApiService.postAPI(`api/stores/${this.storeService.activeStore}/members`, data, (response) => {
          if(response && response['success'] && response['data']){
            this.modalRef.dismiss();
            this.inviteMember.reset();
            this.alertservice.showNotification(response['data']);
          } else if(response && !response['success'] && response['error']['error']){
            let i = 0;
            for (let key in response['error']['error']) {
              this.errors[key] = response['error']['error'][key][0];
              this.alertservice.showNotification(this.errors[key], 'error');
            }
          } else {
            this.alertservice.showNotification('Something went wrong', 'error');
          }
          this.alertservice.hideLoader();
        })
      }
    }
  }
}
