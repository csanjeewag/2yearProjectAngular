import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import{Info} from './../_interfaces/Info';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService} from "./../../AuthGards/auth-service.service";

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  
  constructor(private repository: RepositoryService, private route: Router,private modalService: NgbModal,private auth:AuthServiceService) { }
public taskId:any;
public result:any;
public empid:any;
public result2:any;
public contactForm:FormGroup;
public ctypeid:any;
public ctypename:any;
public taskdetails:any;

  ngOnInit() {
  this.empid=this.auth.tokencheckId();
   // this.empid=1;
    console.log('----------->'+this.empid);
    this.getAllContactTypes();
    this. getTaskForEmployee(this.empid);
    
    this.contactForm = new FormGroup({
      name:new FormControl(''),
add:new FormControl(''),
num1:new FormControl(''),
num2:new FormControl(''),
des:new FormControl(''),
cdes:new FormControl(''),
iscomplete:new FormControl(''),
    })
}

public getAllContactTypes(){
  this.repository.getData('contact/getalltypes')
  .subscribe(res => {
    this.result = res ;
 
   
    
  })
  
}

public closemodel(x){

}

public contactType(typeid,name){
  this.ctypeid=typeid;
  this.ctypename=name;
}

public addContacts(value){

  let formData = new FormData();
  formData.append('Name',value.name);
  formData.append('Address',value.add);
  formData.append('Contact1',value.num1);
  formData.append('Contact2',value.num2);
  formData.append('ContactDescription',value.cdes)
  formData.append('InfoDescription',value.des);
  formData.append('EmployeeId',this.empid);
  formData.append('TaskTaskId',this.taskId);
  formData.append('ContactContactId',this.ctypeid);

  let apiUrl = 'taskinfo/addinfodetails';
    
  this.repository.postFile(apiUrl, formData)
    .subscribe(res => {
      this.ngOnInit();
      this.route.navigate(['task/viewtaskinfo/'+this.taskId]);

      },
      (error => {
        
      })
    )

}





open(content,id) {
  this.taskId=id;
  console.log(this.taskId);
  this.modalService.open(content);
}


public  getTaskForEmployee(id){
  this.repository.getData('task/gettaskforemp/'+id)
  .subscribe(res => {
    this.result2 = res ;
    console.log('--------->'+res);
   
    
  },
  (error) => {
  //  this.handleErrors(error);n
  })
}


public viewInfoDetails(id){
  this.route.navigate(['task/viewtaskinfo/'+id]);
  console.log(id);

}

public AddContactType(){
  this.route.navigate(['task/contact/']);

}




  }

    
           
           
   
    
    



