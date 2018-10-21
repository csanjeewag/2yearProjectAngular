import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors,AsyncValidatorFn } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import { LoginUserInterfaceComponent } from "./../login-user-interface/login-user-interface.component";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterEmployee } from '../_interfaces/register-employee';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {

  constructor(private router: Router,  private repository : RepositoryService,private logcomponent:LoginUserInterfaceComponent) { }
  
  public registerForm: FormGroup;
  public registerEmail:any;
  public message:any;
  ngOnInit() {
    this.registerEmail = this.logcomponent.loginEmail;
   
    this.registerForm = new FormGroup({
      resitercode:new FormControl('',[Validators.required,Validators.maxLength(6)])
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
    this.registerEmail = this.logcomponent.loginEmail;
    if (this.registerForm.valid) {
      
    let register: RegisterEmployee = {
      RegisterCode : resiterFormValue.resitercode,
      RegisterEmpEmail:this.registerEmail,
      
    }
    let apiUrl = 'registeremployee';
    console.log(register)
       this.repository.postData(apiUrl, register)
        .subscribe(res => {
          this.logcomponent.loginEmail = null;
          this.message="Registration Success!";
          this.logcomponent.IsHaveAccount = true;
            },
          (error => {
            this.message="Registration Failed, Try Again!";
          })
        )
     
    }


  }
}
