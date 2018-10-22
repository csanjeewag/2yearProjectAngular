
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors,AsyncValidatorFn } from '@angular/forms';
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap } from '@angular/router';
  import { ActivatedRoute } from '@angular/router';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { EmailPassword } from '../_interfaces/email-password';
  import { LoginByEmail } from "./../_interfaces/login-by-email";
  
  @Component({
    selector: 'app-forget-employee-password',
    templateUrl: './forget-employee-password.component.html',
    styleUrls: ['./forget-employee-password.component.css']
  })
  export class ForgetEmployeePasswordComponent implements OnInit {

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
        password :new FormControl('',[Validators.required,Validators.maxLength(6)]),
        code :new FormControl(this.Code,[Validators.required,Validators.maxLength(6)])


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
        
      let register:EmailPassword  = {
        EmpEmail : this.empEmail,
        EmpPassword : resiterFormValue.password,
        Code : resiterFormValue.code
        
      }
      let apiUrl = 'setpassword';
      console.log(register)
         this.repository.postData(apiUrl, register)
          .subscribe(res => {
           
            this.message="Password change Success!";
            this.RegisterSucces=true;
              },
            (error => {
              this.message="Password Change Failed, Try Again!";
              this.RegisterSucces = false;
            })
          )
       
      }
  
  
    }
  }
  