

  import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";
import {Employee} from './../../_interfaces/employee.model';
import { Observable } from 'rxjs';
import { FilterPipePipe } from "./../../filter-pipe.pipe";
import { AlertifyService } from 'src/app/ShareData/alertify.service';


@Component({
  selector: 'app-change-position',
  templateUrl: './change-position.component.html',
  styleUrls: ['./change-position.component.css']
})
export class ChangePositionComponent implements OnInit {

  public result : any;
  public isAdmin:any;
  public toggle:any;
  public ImageUrl:any;
  public ProfileImage:any= "assets/_image/cslogo.png";
  public position:any;
  public projects:any;
  public departments:any;
  public Loading:any;
  constructor(private alertify: AlertifyService, private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }

  ngOnInit() {
  
    this.GetPositionDetails();
    this.ImageUrl = this.repository.ImageUrl;
    this.getAllEmployee()
    this.isAdmin = this.auth.isAdmin();
    this.GetDepartmentDetails();
    this.GetProjectDetails();
   }

  public detailsemployee( id) {
    
        this.router.navigate(['/profile/list',id]);
     
  }

 

  
 public  getAllEmployee(){
    this.repository.getData('employee/getallemployees')
    .subscribe(res => {
      this.result = res ;
      
      
    },
    (error) => {
    //  this.handleErrors(error);n
    })
  }

  public deleteEmployee(id){

    this.router.navigate(['/profile/delete',id]);

  }

  public statechange(email,state,id){
    this.Loading = email;
    var State:any;
    if(state ==1){
      State = true;
    }else{
      State = false;
    }
    let formData = new FormData;
    formData.append('EmpEmail', email);

    formData.append('IsActive', State);
    if(confirm("Are you sure to change details of "+email+" ?")){
      let apiUrl = 'employee/changeState';
      
      this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
          if(id==this.auth.tokencheckId()){
            this.auth.loggout();
        
          }
          this.getAllEmployee();
          
        this.repository.SuccessAlert("Employee update successfully!");

          this.Loading = null;
          },
          (error => {
            
            this.repository.errorAlert("Employee update failed!");
            this.Loading = null;
          })
        )
    }
  }

  public updateEmployee(id){

    this.router.navigate(['/profile/update',id]);
  }
  public filterInput(){
    this.toggle = !this.toggle;
  }

  public GetPositionDetails(){
    this.repository.getData('position/getroles')
    .subscribe(res => {
      this.position = res ;
    
  },
    (error) => {
    
    })
  }

  public GetDepartmentDetails(){
    this.repository.getData('department/getdepartments')
    .subscribe(res => {
      this.departments = res ;

  },
    (error) => {
    
    })
  }

  public GetProjectDetails(){
    this.repository.getData('project/getprojects')
    .subscribe(res => {
      this.projects = res ;

  },
    (error) => {
    
    })
  }

  public changedetails(id,email,positionId,departmentId,projectId){
  
  let loggout= false;

    let formData = new FormData;
    formData.append('EmpEmail', email);
    if(positionId != ""){
      formData.append('PositionPId',positionId);
      if(id==this.auth.tokencheckId()){
        loggout = true;
      }

    }
    if(departmentId != ""){
      formData.append('DepartmentDprtId',departmentId);
    }
    if(projectId != ""){
      formData.append('ProjectId',projectId);
    }
    
    if(confirm("Are you sure to change details of "+email+" ?")){
      let apiUrl = 'employee/updateemployeedetails';
      
      this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
          this.getAllEmployee();
        
          this.repository.SuccessAlert('successful!');
          if(loggout){ this.auth.loggout();}

          },
          (error => {
            // alert("failed!")
            this.repository.errorAlert('failed');
          })
        )
    }
    
    
  }

  public onChangem(a){
    alert(a)
  }

}
