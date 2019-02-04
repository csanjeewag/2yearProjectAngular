import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  public eventId:any;
  public employee:any;

  public nic:any;
public dob:any;
public transportationMode:any;
public accomadation:any;
public mealType: any;
public gender: any;
public spouseName: any;
public spouseNic: any;
public spouseDob: any;
public attribute:any;

  constructor(private repository :RepositoryService,private route:Router,private rou:ActivatedRoute) { }

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
    this.getparamId();
  }

  public getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.eventId=id;
      this.getEmployees();
     });
  }

public getEmployees(){
  this.repository.getData('RegistrationEmployee/getEmployee/'+this.eventId)
  .subscribe(res => {
    this.employee = res ;
    this.getAttribute(); 
   
  },
  (error) => {
  
  })
  
}



public getAttribute(){
  let apiUrl = 'RegistrationEmployee/getRegistrationAttribute/'+this.repository.curentEventId;
  this.repository.getData(apiUrl)
    .subscribe(res => {
     this.attribute = res;
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


public deleteEmployee(employee){
  let formdata = new FormData;
  formdata.append('IsActive','false'); 
  formdata.append('Id',employee.id); 
  
      formdata.append('Name',employee.name);
      
      formdata.append('EventId',employee.eventId);

      formdata.append('EmployeeId',employee.employeeId); 
      formdata.append('MealType',employee.mealType); 
      formdata.append('Nic',employee.nic);
      formdata.append('Accomadation',employee.accomadation);
      formdata.append('Dob',employee.dob); 
      formdata.append('TransportationMode',employee.transportationMode); 
      formdata.append('Gender',employee.gender);
      formdata.append('SpouseName',employee.spouseName);
      formdata.append('SpouseDob',employee.spouseDob); 
      formdata.append('SpouseNic',employee.spouseNic); 

  let apiUrl = 'RegistrationEmployee/deleteEmployee';
      
  this.repository.postFile(apiUrl, formdata)
     .subscribe(res =>  {
         window.alert("Employee has deleted succesfully")
      },
       (error => {
        
      
       })
     )
}

}
