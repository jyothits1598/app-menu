import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMembersModule } from '../store-members.module';
import { Memberlist } from 'src/app/_models/store-menu';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { REQUEST_A_ACTIVE } from 'src/environments/environment';

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
  private unsubscribe$ = new Subject();
  constructor(
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router,
    private restApiService: RestApiService,
    private authenticateService: AuthenticationService,
    private dataService:DataService
  ) { 
  }

  ngOnInit(): void {
    this.inviteMember = this.formBuilder.group({
      memberEmail: [null, [Validators.required, Validators.email]],
      roleName: ['', [Validators.required]]
    });
    var obj = this;
    obj.getRoledetails(); 
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
        console.log(data)
      }
    }
  }
}
