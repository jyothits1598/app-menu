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
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  invite_members_add_edit:string;
  memberRole = new Array();
  inviteMember: FormGroup;
  changeRoleForm:FormGroup;
  memberEmailSubmit = false;
  rolenameSubmitted = false;
  changeRolenameSubmitted = false;
  roleid:number;
  partnerId:number;
  store_id: string;
  closeResult: string;
  modalRef: ModalRef;
  errors = new Array();
  members_array = new Array();
  updateStoreMemberId:number;
  searchByName:string='';
  searchByType:string='';

  constructor(
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private modalServ: ModalService,
    private alertservice: AlertService
  ) { 
  }
  
  ngOnInit(): void {
  
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
  get g() { return this.changeRoleForm.controls;}

  get modalService(): NgbModal{
    return this._modalService;
  }

  mailRequestrole() {
    this.invite_members_add_edit = 'add';
  }

  showinviteTemplate(invite) {
    this.inviteMember = this.formBuilder.group({
      memberEmail: [null, [Validators.required, Validators.email]],
      roleName: ['4', [Validators.required]]
    });
    this.modalRef = this.modalServ.openTemplateSizemd(invite);
    this.invite_members_add_edit = 'add';
    this.rolenameSubmitted = false;
  }

  showChangeRoleTemplate(memberRoleId,storeMemberId,templateName){
    this.updateStoreMemberId = storeMemberId;
    this.changeRoleForm = this.formBuilder.group({
      changeRoleName: [memberRoleId, [Validators.required]]
    });
    this.modalRef = this.modalServ.openTemplateSizemd(templateName);
    this.changeRolenameSubmitted = false;
  }

  changeRole() {
    let roleDetails = this.inviteMember.value.roleName;
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
        console.log(this.members_array);
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
          'store_member_role_id': this.inviteMember.value.roleName,
          'next_url':REQUEST_A_ACTIVE
        };
        this.alertservice.showLoader();
        this.restApiService.postAPI(`api/stores/${this.storeService.activeStore}/members`, data, (response) => {
          if(response && response['success'] && response['data']){
            this.modalRef.dismiss();
            this.rolenameSubmitted = false;
            this.getmemberDetails();
            this.alertservice.showNotification('Member Invited.','success');
          } else if(response && !response['success'] && response['error']['error']){
            let i = 0;
            for (let key in response['error']['error']) {
              this.errors[key] = response['error']['error'][key][0];
            }
          } else {
            this.alertservice.showNotification('Something went wrong', 'error');
          }
          this.alertservice.hideLoader();
        })
      }
    }
  }

  onSubmitChangeRole(){
    this.changeRolenameSubmitted = true;
    if(this.changeRoleForm.valid) {
      let data={
        'store_member_role_id': this.changeRoleForm.value.changeRoleName,
      };
      this.alertservice.showLoader();
     this.restApiService.patchData(`api/stores/${this.storeService.activeStore}/members/${this.updateStoreMemberId}`, data).pipe(
        finalize(() => this.alertservice.hideLoader())
      ).subscribe(
        (resp : any)=>{
          if(resp && resp.success){
            this.modalRef.dismiss();
            this.alertservice.showNotification('Role Updated.', 'success');
            this.getmemberDetails();
          }
        }
      )
    }
  }

  resendInvite(emailId,storeMemberRoleId){
    if(emailId && storeMemberRoleId) {
      let data={
        'email': emailId,
        'store_member_role_id':storeMemberRoleId,
        'next_url':REQUEST_A_ACTIVE
      };
      this.alertservice.showLoader();
     this.restApiService.patchData(`api/stores/members/${this.storeService.activeStore}/resend`, data).pipe(
        finalize(() => this.alertservice.hideLoader())
      ).subscribe(
        (resp : any)=>{
          if(resp && resp.success){
           this.alertservice.showNotification('Invite Resented.', 'success');
           
          }
        }
      )
    }
  }

  searchMemberbyName(event){
    this.searchByName=event.target.value;
    this.searchMemberList();
  }
  searchMemberbyType(event){
    this.searchByType=event.target.value;
    this.searchMemberList();
  }
  searchMemberList(){
     this.alertservice.showLoader();
      this.members_array.length = 0;
      this.restApiService.getData(`api/stores/${this.storeService.activeStore}/members?name=`+this.searchByName+'&role='+this.searchByType,(response) => {
        if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length>0){
          this.members_array = response['data'];
          console.log(this.members_array);
        }
        this.alertservice.hideLoader();
      })
  }
  viewMemberProfile(storeMemberId){
    this.router.navigate(['./profile/'+storeMemberId], {relativeTo: this.route});
  }

  removeErrorMsg(msg_id){
    this.errors[msg_id]='';
  }
}
