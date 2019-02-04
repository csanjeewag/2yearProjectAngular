import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";

@Component({
  selector: 'app-select-attribute-registration',
  templateUrl: './select-attribute-registration.component.html',
  styleUrls: ['./select-attribute-registration.component.css']
})
export class SelectAttributeRegistrationComponent implements OnInit {

  constructor(private auth: AuthServiceService,private router: Router,  private repository : RepositoryService,private rou:ActivatedRoute) { }
  public EventForm: FormGroup;
  public Message:any;
  public EventId:any;
  public urlAddress:any;
  public attribute:any;
  public eventId:any;
  ngOnInit() {
    this.getparamId();
    this.getAttribute();
    this.EventForm = new FormGroup({
    
      nic: new FormControl(''),
      transportationMode: new FormControl(''),
      accomadation: new FormControl(''),
      mealType: new FormControl(''),
      gender: new FormControl(''),
      spouseName: new FormControl(''),
      spouseNic: new FormControl(''),
      spouseDob: new FormControl(''),
      dob: new FormControl(''),

      })
    
  }
 

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      if(id!=null){
        this.eventId=id;
      }else{
  this.eventId=this.repository.eventId;
   }
  
     });
  }


  public getAttribute(){
    let apiUrl = 'RegistrationEmployee/getRegistrationAttribute/'+this.eventId;
    this.repository.getData(apiUrl)
      .subscribe(res => {
       this.attribute = res;
      this.fiilEvent();
        },
        (error => {
      
        })
      )
  }
  
      
      
  public fiilEvent(){
    this.EventForm.controls['nic'].setValue(this.attribute.nic);
     this.EventForm.controls['dob'].setValue(this.attribute.dob);
    this.EventForm.controls['accomadation'].setValue(this.attribute.accomadation);
     this.EventForm.controls['mealType'].setValue(this.attribute.mealType);
    this.EventForm.controls['gender'].setValue(this.attribute.gender);
    this.EventForm.controls['spouseName'].setValue(this.attribute.spouseName);
    this.EventForm.controls['spouseNic'].setValue(this.attribute.spouseNic);
    this.EventForm.controls['spouseDob'].setValue(this.attribute.spouseDob);

  }


  public createrole(value) {
   
    let formdata = new FormData;
    formdata.append('Id',this.attribute.id);
    formdata.append('EventId',this.eventId);
    formdata.append('Nic',value.nic);
    formdata.append('Dob',value.dob);
    formdata.append('TransportationMode',value.transportationMode);
    formdata.append('Accomadation',value.accomadation);
    formdata.append('MealType',value.mealType);
    formdata.append('Gender',value.gender);
    formdata.append('SpouseName',value.spouseName);
    formdata.append('SpouseNic',value.spouseNic);
    formdata.append('SpouseDob',value.spouseDob);
    
    

   
      let apiUrl = 'RegistrationEmployee/updateRegistrationAttribute';
      
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {
         this.urlAddress = "events/addregistrationform/"+this.eventId;
          this.router.navigate([this.urlAddress]);
          
       
          },
          (error => {
           
          })
        )
    
    
  }

}
