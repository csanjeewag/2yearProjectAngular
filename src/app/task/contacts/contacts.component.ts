import { Component, OnInit } from '@angular/core';

import {  RepositoryService} from './../../ShareData/repository.service';
import{ContactType} from './../_interfaces/ContactType';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public result:any;
  public show:boolean = false;
  public buttonName:any = '+';
  public AddContactForm:FormGroup;
  public allcontacts:any;
public ContactForm:FormGroup;
public contactid:any;
public ContactFormUpdate:FormGroup;

  constructor( private repository : RepositoryService,private router:Router,config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllContactTypes();

    this.AddContactForm = new FormGroup({  
      oname:new FormControl(''),
      address:new FormControl(''),
      num1:new FormControl(''),
      num2:new FormControl(''),
      cd:new FormControl(''),
      

      }),
      this.ContactForm=new FormGroup({
        type:new FormControl('')
      }),
      this.ContactFormUpdate=new FormGroup({
        type:new FormControl('')

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
  };
  let apiUrl = 'contact/addcontacttype';
    this.repository.postData(apiUrl,ctype)
    
        .subscribe(res => {
            
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

  let apiUrl = 'contact/addcontactdetailnormally';
    
  this.repository.postFile(apiUrl, formData)
    .subscribe(res => {
      
      },
      (error => {
        
      })
    )

}
public updateContactType(value){

}




}
