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
  this.repository.getData('Registration/getEmployee/'+this.eventId)
  .subscribe(res => {
    this.employee = res ;
    this.getAttribute(); 
    console.log("response = "+this.employee);
  },
  (error) => {
  //  this.handleErrors(error);n
  })
  
}

public getdate(){
  
  for (var employee of this.employee) {
    employee.dob=""+employee.dob;
    let x=employee.dob.split("T");
    employee.dob=x[0];
    console.log("bday = "+employee.dob);
    employee.spouseDob=""+employee.spouseDob;
    let y = employee.spouseDob.split("T");
    employee.spouseDob=y[0];
      
  }
      
         
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


}
