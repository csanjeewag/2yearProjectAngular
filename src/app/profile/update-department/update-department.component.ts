
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute } from '@angular/router';
  import { Department } from '../_interfaces/department';
  
  @Component({
    selector: 'app-update-department',
    templateUrl: './update-department.component.html',
    styleUrls: ['./update-department.component.css']
  })
  export class UpdateDepartmentComponent implements OnInit {
  
    constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }
  
    public departmentForm: FormGroup;
    public Message:any;
    public department:any;
    public empId:any;
    ngOnInit() {
      this.getDepartment();
      this.departmentForm = new FormGroup({
        departmentId: new FormControl('',[Validators.required]),
        departmentName: new FormControl('',[Validators.required])
  
       })
    }
  
  
    public validateControl(controlName: string) {
      if (this.departmentForm.controls[controlName].invalid && this.departmentForm.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.departmentForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
  
    public createdepartment(DepartmentFormvalue) {
  
      if (this.departmentForm.valid) {
        
        let departments: Department = {
          DprtId: DepartmentFormvalue.departmentId,
          DprtName: DepartmentFormvalue.departmentName
         
        };
    
        let apiUrl = 'updatedepartment';
        
        this.repository.postData(apiUrl, departments)
          .subscribe(res =>  {
            this.Message="Department updated!";
              this.router.navigate(['/profile/admin/departments']);
         
            },
            (error => {
              this.Message="Department updated Failed,Try Again!";
            })
          )
      
      }
    }

    public getDepartment(){

      
        this.empId = this.route.snapshot.paramMap.get('id')
        console.log(this.empId)
        
        this.repository.getData('getdepartment/'+this.empId)
        .subscribe(res => {
          this.department = res ;
          console.log(res)
          this.filldepartment();
        },
        (error) => {
        //  this.handleErrors(error);n
        })
       
     
    }
  
    public filldepartment(){
      this.departmentForm.controls['departmentId'].setValue(this.department.dprtId);
      this.departmentForm.controls['departmentName'].setValue(this.department.dprtName);

    }
    public redirectToOwnerList(){
      this.router.navigate(['/profile/admin/departments']);
      
     }
    
  }
  
