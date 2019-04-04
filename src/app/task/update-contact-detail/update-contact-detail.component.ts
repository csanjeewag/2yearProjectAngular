import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{NewTask} from './../_interfaces/new-task';
  import {  RepositoryService } from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute} from '@angular/router';
  import { AuthServiceService } from "./../../AuthGards/auth-service.service";
  import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-update-contact-detail',
  templateUrl: './update-contact-detail.component.html',
  styleUrls: ['./update-contact-detail.component.css']
})
export class UpdateContactDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private router: Router,  private repository : RepositoryService,private auth:AuthServiceService,config: NgbModalConfig, private modalService: NgbModal) { }
public result:any;
public contactdetailid:any;
public contactdetail:any;
public updateContactForm:FormGroup;
public empid:any;
public ContactContactId:any;

  ngOnInit() {
    this.empid=this.auth.tokencheckId();
    this.getContactDetails();

   this. updateContactForm=new FormGroup({
     oname:new FormControl(''),
     address:new FormControl(''),
     num1:new FormControl(''),
     num2:new FormControl(''),
     cd:new FormControl(''),

    }) 

  }

/**
 * getContactDetails
 */
public getContactDetails() {
  this.route.paramMap.subscribe((params:ParamMap)=>{
    let id = parseInt(params.get('id'));
     this.contactdetailid=id;
    
    this.repository.getData('contact/getdetailbyid/'+id)
    
    .subscribe(res => {
      this.contactdetail = res as any;
      this.ContactContactId=this.contactdetail.contactContactId;
      this.fillContactDetail();
    },
    (error) => {
    })
   });
    
}

public fillContactDetail(){
  this.updateContactForm.controls['oname'].setValue(this.contactdetail.name);
  this.updateContactForm.controls['num1'].setValue(this.contactdetail.number1);
  this.updateContactForm.controls['num2'].setValue(this.contactdetail.number2);
  this.updateContactForm.controls['cd'].setValue(this.contactdetail.contactDescription);
  this.updateContactForm.controls['address'].setValue(this.contactdetail.address);

}



public updateContacts(value){
  
  let formData = new FormData();
  formData.append('ContactDetailId',this.contactdetailid);
  formData.append('Name',value.oname);
  formData.append('Address',value.address);
  formData.append('Number1',value.num1);
  formData.append('Number2',value.num2);
  formData.append('ContactDescription',value.cd);
  formData.append('EmployeeId',this.empid);
  formData.append('ContactContactId',this.ContactContactId);

  let apiUrl = 'contact/updatecontactdetail';
    
  this.repository.postFile(apiUrl, formData)
    .subscribe(res => {
      this.router.navigate(['/task/viewcontact/'+this.ContactContactId]);

      this.repository.SuccessAlert('Updated!');      },
      (error => {
        
      })
    )

}

}
