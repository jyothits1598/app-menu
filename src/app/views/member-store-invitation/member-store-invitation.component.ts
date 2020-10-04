import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { finalize } from 'rxjs/operators';
import { ModalService } from 'src/app/views/shared/services/modal.service';



@Component({
  selector: 'app-member-store-invitation',
  templateUrl: './member-store-invitation.component.html',
  styleUrls: ['./member-store-invitation.component.scss']
})
export class MemberStoreInvitationComponent implements OnInit {
  member_invite_auth_token:string = '';
  member_invite_email_token:string = '';
  member_invite_store_token:string = '';
  errors = new Array();
  invitedStoreDetails:any = {};
  invite_success:boolean=false;
  constructor(
    private _modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private restApiService: RestApiService,
    private alertService: AlertService,
    private modalServ: ModalService,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.member_invite_auth_token = params['member_auth_token'];
      this.member_invite_email_token = params['member_email_token'];
      this.member_invite_store_token = params['store_token'];
  });
  }

  ngOnInit(): void {
    var obj = this;
    if(this.member_invite_auth_token){
      obj.getStoreDetails();
    }
    
  }

  get modalService(): NgbModal{
    return this._modalService;
  }

  getStoreDetails(){
    // this.invitedStoreDetails = [];
    this.alertService.showLoader();
    this.restApiService.getDataReturn('api/stores/members/'+this.member_invite_store_token+'/'+this.member_invite_auth_token, (response) => {
      if (response && response['success'] && response['data']) {
        this.alertService.hideLoader();
        let data = response['data'];
        this.invitedStoreDetails = data;
      }else{
        this.router.navigateByUrl('/dashboard');
      }
    })
  }
  acceptInvitation(){
        let data={
          'auth_token': this.member_invite_auth_token,
          'email_token': this.member_invite_email_token,
        };
        this.alertService.showLoader();
       this.restApiService.patchData('api/stores/members/invitation/confirm', data).pipe(
          finalize(() => this.alertService.hideLoader())
        ).subscribe(
          (resp : any)=>{
            if(resp && resp.success){
              this.alertService.showNotification('Invite Accepted', 'success');
              this.invite_success=true;
            }
          }
        )
      }
  
}
