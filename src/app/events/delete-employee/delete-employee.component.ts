import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
public empId:any;
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
  constructor(private repository :RepositoryService,private route:Router) { }

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
    this.empId='7'
    this.getEmployees();
  }

  public getEmployees(){
    this.repository.getData('Registration/getEmp/'+this.repository.curentEventId+'/'+this.empId)
    .subscribe(res => {
      this.employee = res ;
      
      console.log("response = "+this.employee);
    },
    (error) => {
    //  this.handleErrors(error);n
    })
    this.getAttribute();
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

  public deleteEmployee(){
    console.log("inside delete")
    let formdata = new FormData;
    formdata.append('IsActive','false'); 
    formdata.append('Id',this.employee.id); 
    
        formdata.append('Name',this.employee.name);
        
        formdata.append('EventId',this.employee.eventId);

        formdata.append('EmployeeId',this.employee.employeeId); 
        formdata.append('MealType',this.employee.mealType); 
        formdata.append('Nic',this.employee.nic);
        formdata.append('Accomadation',this.employee.accomadation);
        formdata.append('Dob',this.employee.dob); 
        formdata.append('TransportationMode',this.employee.transportationMode); 
        formdata.append('Gender',this.employee.gender);
        formdata.append('SpouseName',this.employee.spouseName);
        formdata.append('SpouseDob',this.employee.spouseDob); 
        formdata.append('SpouseNic',this.employee.spouseNic); 

    let apiUrl = 'Registration/deleteEmployee';
        
    this.repository.postFile(apiUrl, formdata)
       .subscribe(res =>  {
           window.alert("Employee has deleted succesfully")
        },
         (error => {
          
        
         })
       )
  }

}
