
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors,AsyncValidatorFn } from '@angular/forms';
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap } from '@angular/router';
  import { ActivatedRoute } from '@angular/router';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { RegisterEmployee } from '../_interfaces/register-employee';
  
  @Component({
    selector: 'app-employee-register-by-link',
    templateUrl: './employee-register-by-link.component.html',
    styleUrls: ['./employee-register-by-link.component.css']
  })
  export class EmployeeRegisterByLinkComponent implements OnInit {
    constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }
    
    public registerForm: FormGroup;
    public registerEmail:any;
    public message:any;
    public empEmail:any;
    public Name:any;
    public Code:any;
    public RegisterSucces:any;

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.empEmail = params['email'];
        this.Name = params['name'];
        this.Code = params['code'];
       this.registerEmail=this.empEmail;
    });

      this.registerForm = new FormGroup({
        resitercode:new FormControl(this.Code,[Validators.required,Validators.maxLength(6)])
      })
    }
    public validateControl(controlName: string) {
      if (this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.registerForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
  
    public Register(resiterFormValue) {
      
      if (this.registerForm.valid) {
        
      let register: RegisterEmployee = {
        RegisterCode : resiterFormValue.resitercode,
        RegisterEmpEmail:this.registerEmail,
        
      }
      let apiUrl = 'registeremployee';
      console.log(register)
         this.repository.postData(apiUrl, register)
          .subscribe(res => {
           
            this.message="Registration Success!";
            this.RegisterSucces=true;
              },
            (error => {
              this.message="Registration Failed, Try Again!";
              this.RegisterSucces = false;
            })
          )
       
      }
  
  
    }
  }
  