import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser} from './../_interfaces/login-user.model';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  

  constructor( private repository : RepositoryService, private route:Router,private rou:ActivatedRoute) { }




  public deleteForm: FormGroup;

  

  public empId;
  Message:any;
  ngOnInit() {

    this.getparamId();

    this.deleteForm = new FormGroup({
     
      pass: new FormControl('',[Validators.required])
     })
  }
  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.empId=id;
     });
  }

  public delete(deleteForm) {
    if (this.deleteForm.valid) {
      this.executedelete(deleteForm);
      console.log(deleteForm);
      this.Message="";
    
    }
  }

  public executedelete(deleteForm){
    let loginuser: LoginUser = {
      EmpId: this.empId,
      EmpPassword: deleteForm.pass,
     
    };

    let apiUrl = 'delete';
      
      this.repository.deleteUser(apiUrl, loginuser)
        .subscribe(res => {
            
          if(res){
           // this.Message="Your loggin Success!";
            alert("delete details!");
            this.route.navigate(['/profile/list']);
          }
            
          },
          (error => {
            this.Message="Your delete faild, Try Again!";
            
          //  this.errorHandler.handleError(error);
          //  this.errorMessage = this.errorHandler.errorMessage;
          })
        )
  }

  public rederect(){
    this.route.navigate(['/profile/list']);
    alert("Not Deleted Any Data!");
  }

}
