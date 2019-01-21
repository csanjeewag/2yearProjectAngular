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
 
  // toggle() {
  //   this.show = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if(this.show)  
  //     this.buttonName = "Add";
  //   else
  //     this.buttonName = "+";
  // }

  public addContactType(profileFormValue) {
    let ctype: ContactType = {
      
      contactType:profileFormValue.type,
  };
  let apiUrl = '/contact/addcontact';
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




}
