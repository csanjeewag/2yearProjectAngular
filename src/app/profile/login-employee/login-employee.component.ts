

  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, AbstractControl, ValidationErrors, Validators, AsyncValidatorFn } from '@angular/forms';

  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
 
  import { LoginUserInterfaceComponent  } from "./../login-user-interface/login-user-interface.component";
import { LoginByEmail } from '../_interfaces/login-by-email';
  import { EmailCheck } from "./../_interfaces/email-check";
  
  @Component({ 
    selector: 'app-login-employee',
    templateUrl: './login-employee.component.html',
    styleUrls: ['./login-employee.component.css']
  })
  export class LoginEmployeeComponent implements OnInit {
  
    constructor(private router: Router,  private repository : RepositoryService, private logcomponent :LoginUserInterfaceComponent) { }
    public result :any ;
    public Message: {};
    public loginForm: FormGroup;
 
    public isNotEmail:any;
    public hiddenPassword:any;

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
      public validateEmail() {
          let controlName ='email';
        if (! (this.shouldBeUnique(controlName)) && this.loginForm.controls[controlName].touched)
          return true;
    
        return false;
      }
      public createLogin(loginFormvalue) {
        this.validateEmail();
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
                this.result = res;
            
              this.Message="Your loggin Success!";
              
                this.router.navigate(['/profile/list']);

              localStorage.setItem('token',this.result.token );
          
            },
            (error => {
              this.Message="Your loggin faild, Check your Id or Password!";
              
            })
          )
      }
  
      public redirectToOwnerList(){
        this.router.navigate(['/profile/list']);
      }
      
  
    public  shouldBeUnique(controlName: string ){
        
       let isunique;
       let apiUrl = 'isuniqueemail';
       let loginuse: EmailCheck = {
        Email: this.loginForm.controls[controlName].value
      }
     

    this.repository.postData(apiUrl,loginuse)
          .subscribe(res=>{
            
            if(res==true)
            {this.isNotEmail =false;  this.hiddenPassword = true;}
            else 
            {this.isNotEmail =true; this.hiddenPassword = false;}
          },(error => {
           
           
          })
          )

      }
      
    public  hiddenpassword(){
        if(this.shouldBeUnique('email')){
          this.hiddenPassword = true;
        
      }
    }
  }
  
