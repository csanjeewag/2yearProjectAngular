import { Component, OnInit } from '@angular/core';

import {  RepositoryService} from './../../ShareData/repository.service';
import{ContactType} from './../_interfaces/ContactType';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthServiceService} from "./../../AuthGards/auth-service.service";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public Loading:any;
  public result:any;
  public show:boolean = false;
  public buttonName:any = '+';
  public AddContactForm:FormGroup;
  public allcontacts:any;
public ContactForm:FormGroup;
public contactid:any;
public ContactFormUpdate:FormGroup;
public empid:any;

  constructor(private auth:AuthServiceService, private repository : RepositoryService,private router:Router,config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit() {
        
    this.empid=this.auth.tokencheckId();

    this.getAllContactTypes();

    this.AddContactForm = new FormGroup({  
      oname:new FormControl(''),
      address:new FormControl(''),
      num1:new FormControl(''),
      num2:new FormControl(''),
      cd:new FormControl(''),
      

      }),
      this.ContactForm=new FormGroup({
        type:new FormControl(''),
        description:new FormControl('')
      })
    
  }

  public getAllContactTypes(){
    this.repository.getData('contact/getalltypes')
    .subscribe(res => {
      this.result = res ;
   
   
      
    })
    
  }
  open2(content,ctypeid) {
    
    this.modalService.open(content);
    this.contactid=ctypeid;
  }
 
  open(content){
    this.modalService.open(content);

  }

  public addContactType(ContactForm) {
    let ctype: ContactType = {
      
      contactType:ContactForm.type,
      description:ContactForm.description,
  };
  let apiUrl = 'contact/addcontacttype';
    this.repository.postData(apiUrl,ctype)
    
        .subscribe(res => {
          alert('Type added');
          this.ngOnInit();
          this.getAllContactTypes();
            

          })

}

public viewAll(id){

    this.router.navigate(['task/viewcontact/'+id]);
  

}

public addContacts(value){
  console.log(value);
  console.log(this.contactid);
  let formData = new FormData();
  formData.append('ContactContactId',this.contactid);
  formData.append('Name',value.oname);
  formData.append('Address',value.address);
  formData.append('Number1',value.num1);
  formData.append('Number2',value.num2);
  formData.append('ContactDescription',value.cd);
  formData.append('EmployeeId',this.empid);
  let apiUrl = 'contact/addcontactdetailnormally';
    
  this.repository.postFile(apiUrl, formData)
    .subscribe(res => {
      alert('Detail Added')
      },
      (error => {
        
      })
    )

}
public updateContactType(value){

}
public x(){
  this.getAllContactTypes();

}

public deleteContactType(id){
  this.Loading = id;
  this.repository.getData('contact/deactive/'+id)
  .subscribe(res => {
  this.getAllContactTypes()
  this.Loading = false;
console.log('deleted');
  this.getAllContactTypes();
},
 (error) => {
 this.Loading =false;
 })
}



}
