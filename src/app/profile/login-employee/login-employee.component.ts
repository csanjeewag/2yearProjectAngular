

  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';

  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router } from '@angular/router';
  
 
  import { LoginUserInterfaceComponent  } from "./../login-user-interface/login-user-interface.component";
import { LoginByEmail } from '../_interfaces/login-by-email';
  
  @Component({ 
    selector: 'app-login-employee',
    templateUrl: './login-employee.component.html',
    styleUrls: ['./login-employee.component.css']
  })
  export class LoginEmployeeComponent implements OnInit {
  
    constructor(private router: Router,  private repository : RepositoryService, private logcomponent :LoginUserInterfaceComponent) { }
    public r :any ;
    public Message: {};
    public loginForm: FormGroup;
  
    ngOnInit() {
    
      this.loginForm = new FormGroup({
        email: new FormControl('',[Validators.required,Validators.email]),
        pass: new FormControl('',[Validators.required])
       })
       }

      public crateAccount(){
        this.logcomponent.IsHaveAccount = false;
       }
  
       public validateControl(controlName: string) {
        if (this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched)
          return true;
    
        return false;
      }
    
      public hasError(controlName: string, errorName: string) {
        if (this.loginForm.controls[controlName].hasError(errorName))
          return true;
    
        return false;
      }
  
      public createLogin(loginFormvalue) {
        if (this.loginForm.valid) {
          this.executeLoginCreation(loginFormvalue);
          
          this.Message="";
        
        }
      }
  
      private executeLoginCreation(loginFormValue) {
        let loginuser: LoginByEmail = {
          EmpEmail: loginFormValue.email,
          EmpPassword: loginFormValue.pass,
         
        };
    
        let apiUrl = 'loginEmail';
        
        this.repository.postData(apiUrl, loginuser)
          .subscribe(res =>  {
                this.r = res;
            
              this.Message="Your loggin Success!";
              
                this.router.navigate(['/profile/list']);
              
              
             // localStorage.setItem('id',this.r.empId );
             // localStorage.setItem('pass',this.r.empPassword );
              localStorage.setItem('token',this.r.token );
              
              
              
            },
            (error => {
              this.Message="Your loggin faild, Check your Id or Password!";
            //  this.errorHandler.handleError(error);
            //  this.errorMessage = this.errorHandler.errorMessage;
            })
          )
      }
  
      public redirectToOwnerList(){
        this.router.navigate(['/profile/list']);
      }
      
  
  
  
  
  }
  
