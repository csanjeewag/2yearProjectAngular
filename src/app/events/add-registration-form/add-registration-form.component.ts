import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap, ActivatedRoute  } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";


@Component({
  selector: 'app-add-registration-form',
  templateUrl: './add-registration-form.component.html',
  styleUrls: ['./add-registration-form.component.css']
})
export class AddRegistrationFormComponent implements OnInit {

  constructor(private auth: AuthServiceService ,private router: Router,  private repository : RepositoryService,private route: ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { }

  public EventForm: FormGroup;
  public eventId:any;
  public attribute:any;
public name:any;
public EmpId:any;
public urlAddress :any;


  ngOnInit() {
this.name=true;
this.EmpId=true;
this.getparamId();

    this.EventForm = new FormGroup({
     
      name: new FormControl(''),
      nic: new FormControl(''),
      dob: new FormControl(''),
      transportationMode: new FormControl(''),
      accomadation: new FormControl(''),
      
      mealType: new FormControl(''),
      gender: new FormControl(''),
      spouseName: new FormControl(''),
      spouseNic: new FormControl(''),
      spouseDob: new FormControl(''),
      })


  }



  public createrole(value){
    let formdata = new FormData;
   
    if(this.attribute!=null){
    window.alert("Registration form has been added succesfully");
    this.urlAddress = "events/vieweventpage/"+this.eventId;
    this.router.navigate([this.urlAddress]);
    }else{
    formdata.append('EventId',this.eventId);   
    
      let apiUrl1 = 'RegistrationEmployee/addRegistrationAttribute';
      
      this.repository.postFile(apiUrl1, formdata)
        .subscribe(res =>  {
          this.repository.SuccessAlert("Registration form has been added succesfully");

          this.urlAddress = "events/vieweventpage/"+this.eventId;
          this.router.navigate([this.urlAddress]);
       
          },
          (error => {
            
          })
        )
      }
}


public updateEvent(value){
  let formdata = new FormData;
  if(this.attribute!=null){
    this.urlAddress = "events/selectattributesforregistration/"+this.eventId;
    this.router.navigate([this.urlAddress]);
    }else{
      formdata.append('EventId',this.eventId);   
      
        let apiUrl1 = 'RegistrationEmployee/addRegistrationAttribute';
        
        this.repository.postFile(apiUrl1, formdata)
          .subscribe(res =>  {
            this.urlAddress = "events/selectattributesforregistration/"+this.eventId;
            this.router.navigate([this.urlAddress]);
         
            },
            (error => {
              
            })
          )

    }
}

public getRegistrationAttribute(){
  let apiUrl = 'RegistrationEmployee/getRegistrationAttribute/'+this.eventId;
  this.repository.getData(apiUrl)
  .subscribe(res => {
   this.attribute = res;
 
    },
    (error => {
  
    })
  )
}

getparamId(){
  this.route.paramMap.subscribe((params:ParamMap)=>{
    let id =params.get('id');
    if(id!=null){
      this.eventId=id;
    }else{
this.eventId=this.repository.eventId;
 }

   });
   this.getRegistrationAttribute();
}


}