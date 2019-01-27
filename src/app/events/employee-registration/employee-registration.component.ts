import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators} from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute  } from '@angular/router';
  import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { AuthServiceService } from "./../../AuthGards/auth-service.service";


@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {

  

  constructor(private auth: AuthServiceService ,private router: Router,  private repository : RepositoryService,private route: ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { }


  public EventForm: FormGroup;
  public Message:any;
  public eventtypes:any;
  public des:any;
  public urlAddress:any
  public event:any;
  public eventId:any;
  public attribute:any;
  

  public nic:any;
  public dob:any;
  public transportationMode:any;
  public accomadation:any;
  public mealType: any;
  public gender: any;
 public spouseName: any;
 public spouseNic: any;
 public spouseDob: any;
 public modalRef: any;
 public empId:any;
 regForms = [{'id':'Private', 'name':'Use my vehicle'}, {'id':'Company', 'name': 'Company Transportation'}];
  accom = [{'id':'SingleRoom', 'name':'Single room'}, {'id':'DoubleRsoom', 'name': 'Double Room'},{'id':'FamilyRoom', 'name': 'Family Room'}];
  meal = [{'id':'vegi', 'name':'Vegi'}, {'id':'non vegi', 'name': 'Non vegi'}];
  
  ngOnInit() {

    this.nic =false;
    this.dob=false;
    this.transportationMode=false;
    this.accomadation=false;
    this.mealType=false;
    this.gender=false;
    this.spouseName=false;
    this.spouseNic=false;
    this.spouseDob=false;
this.empId=7;
    this.getparamId();
    
    this.EventForm = new FormGroup({
     // EventId: new FormControl('',[Validators.required]),
     name: new FormControl('',[Validators.required]),
     
     nic: new FormControl(''),
     dob: new FormControl(''),
     
     transportationMode: new FormControl(''),
     accomadation: new FormControl(''),
     mealType: new FormControl(''),
     gender: new FormControl(''),
     spouseName: new FormControl(''),
     spouseDob: new FormControl(''),
     spouseNic: new FormControl(''),
     
     
     })
     
  }
  
  public validateControl(controlName: string) {
    if (this.EventForm.controls[controlName].invalid && this.EventForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.EventForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  

  public createrole(value) {
  
  console.log(value) 
    if (this.EventForm.valid) {
      if(this.eventId!=null){
        let formdata = new FormData;
        formdata.append('EventId',this.eventId);
        formdata.append('Name',value.name);
        formdata.append('EmployeeId',this.empId); 
        formdata.append('MealType',value.mealType); 
        formdata.append('Nic',value.Nic);
        formdata.append('Accomadation',value.accomadation);
        formdata.append('Dob',value.dob); 
        formdata.append('TransportationMode',value.transportationMode); 
        formdata.append('Gender',value.gender);
        formdata.append('SpouseName',value.spouseName);
        formdata.append('SpouseDob',value.spouseDob); 
        formdata.append('SpouseNic',value.spouseNic); 
        formdata.append('IsActive','true'); 

       
        
        
             let apiUrl = 'Registration/addEmployee';
         console.log("formdata"+formdata)
         console.log("description = "+value.EventDescription)
         
         this.repository.postFile(apiUrl, formdata)
           .subscribe(res =>  {
             //this.Message="Project updated!";
             console.log("response = "+res)
             window.alert("You have registered succesfully")
            
             },
             (error => {
              window.alert("You have already registered")
            
             })
           )
      }
    
    }



  }

  checkEmployee(){

  }












 
 

  public getAttribute(){
    let apiUrl = 'Registration/getRegistrationAttribute/'+this.repository.curentEventId;
    console.log("inside get attribute")
    this.repository.getData(apiUrl)
      .subscribe(res => {
       this.attribute = res;
      console.log(res)
          
          this.dob = this.attribute.dob;
          this.transportationMode = this.attribute.transportationMode;
          this.accomadation = this.attribute.accomadation;
          this.mealType = this.attribute.mealType;
          this.gender = this.attribute.gender;
          this.spouseName = this.attribute.spouseName;
          this.spouseNic = this.attribute.spouseNic;
          this.nic = this.attribute.nic;
          this.spouseDob = this.attribute.spouseDob;

         
         
        },
        (error => {
      
        })
      )
  }
  getparamId(){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.eventId=id;
      console.log("id of the evenet = "+id)
      console.log("get the  param id"+id)
     
         this.eventId=this.repository.curentEventId;
         console.log("event id = "+this.repository.eventId)
         this.getAttribute();
    

     });
}







  
}
