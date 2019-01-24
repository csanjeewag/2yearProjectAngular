import { Component, OnInit } from '@angular/core';

import {  RepositoryService} from './../../ShareData/repository.service';
import{ContactType} from './../_interfaces/ContactType';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public result:any;
  public show:boolean = false;
  public buttonName:any = '+';
  public ContactForm:FormGroup;
  public allcontacts:any;


  constructor( private repository : RepositoryService,config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllContactTypes();

    this.ContactForm = new FormGroup({  
      type: new FormControl(''),

      })
  }

  public getAllContactTypes(){
    this.repository.getData('contact/getalltypes')
    .subscribe(res => {
      this.result = res ;
   
     console.log(this.result);
      
    })
    
  }
  open(content) {
   
    this.modalService.open(content);
  }
 
  

  public addContactType(profileFormValue) {
    let ctype: ContactType = {
      
      contactType:profileFormValue.type,
  };
  let apiUrl = '/contact/addcontacttype';
    this.repository.postData(apiUrl,ctype)
    
        .subscribe(res => {
          //this.router.navigate(['/task/list']);
            
          })

}

public viewAll(id){
  this.repository.getData('contact/getallfortype/'+id)
  .subscribe(res => {
    //this.result = res as Observable<NewTask>;
    this.allcontacts = res as any;
    console.log(this.allcontacts);
 

  })
  

}
public addContacts(value){
  let formData = new FormData();
  formData.append('Name',value.name);
  formData.append('Address',value.add);
  formData.append('Number1',value.num1);
  formData.append('Number2',value.num2);
  formData.append('Number3',value.num3);

  let apiUrl = 'task/create';
    
  this.repository.postFile(apiUrl, formData)
    .subscribe(res => {
      
      },
      (error => {
        
      })
    )

}




}
