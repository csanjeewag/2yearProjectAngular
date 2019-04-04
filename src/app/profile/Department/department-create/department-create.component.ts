import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';

import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';
import { Department } from '../../_interfaces/department';
import { AlertifyService } from 'src/app/ShareData/alertify.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  constructor(private alertify: AlertifyService,private router: Router,  private repository : RepositoryService) {}

  public departmentForm: FormGroup;
  public Message:any;
  ngOnInit() {
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
    this.router.navigate(['/profile/admin']);
    if (this.departmentForm.valid) {
      
      let departments: Department = {
        DprtId: DepartmentFormvalue.departmentId,
        DprtName: DepartmentFormvalue.departmentName
       
      };
  
      let apiUrl = 'department/createdepartment';
      
      this.repository.postData(apiUrl, departments)
        .subscribe(res =>  {
          this.alertify.Success('Department Created!')
             this.router.navigate(['/profile/admin/departments']);
              this.fill();
          },
          (error => {
            this.Message="Department Created Failed,Try Again!";
          })
        )
    
    }
  }

  public redirectToOwnerList(){
    //this.router.navigate(['/profile/list']);
    this.departmentForm = new FormGroup({
      departmentId: new FormControl('',),
      departmentName: new FormControl(''),})

  }
  
  public fill(){
    this.departmentForm.controls['departmentId'].setValue('');
    this.departmentForm.controls['departmentName'].setValue('');

  }
  
}
