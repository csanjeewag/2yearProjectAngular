

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
    public wait:any;
    public isNotEmail:any;
    public hiddenPassword:any;
    public Loading : any;
    public EmployeeLoginView:any;
    public EmployeeName:any;
    public ImageUrl :any;
    public profileImage:any="assets/_image/cslogo.png";

    ngOnInit() {
      this.ImageUrl = this.repository.ImageUrl;
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
        this.Loading = true;
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
    
        let apiUrl = 'employee/loginEmail';
        
        this.repository.postData(apiUrl, loginuser)
          .subscribe(res =>  {
                this.result = res;
            this.Message="Your loggin Success!";
           this.router.navigate(['/profile/home']);
            this.Loading = false;
              localStorage.setItem('token',this.result.token );
          
            },
            (error => {
              this.Message="Your loggin faild, Check your Id or Password!";
              this.Loading = false;
            })
          )
      }
  
      public redirectToOwnerList(){
        this.router.navigate(['/profile/list']);
      }
      
  
    public  shouldBeUnique(controlName: string ){
        this.Loading = true;
       let isunique;
       let apiUrl = 'employee/isuniqueemail';
       let loginuse: EmailCheck = {
        Email: this.loginForm.controls[controlName].value
      }
     

    this.repository.postData(apiUrl,loginuse)
          .subscribe(res=>{
            this.Loading = false;
            this.EmployeeLoginView = res;
            
            this.SetViewLogin();
          
            this.isNotEmail =false;  this.hiddenPassword = true;
           return true;
          },(error => {
            this.Message = "email is not register!"
            this.isNotEmail =true; this.hiddenPassword = false;
           this.Loading = false;
           return true;
          })
          )
          return false;
      }
    public forgetpassword(value){
     this.wait = "please wait for while, check your email.."; 
      
      this.repository.getData('forgetpassword/'+value.email)
      .subscribe(res => {
        this.Message="For change password, go to your email.";
        this.wait = ""; 
    },
      (error) => {
        this.Message="you can not change password.";
        this.wait = ""; 
      })
    }  
    public  hiddenpassword(){
        if(this.shouldBeUnique('email')){
          this.hiddenPassword = true;
        
      }
    }

  public SetViewLogin()
  {
      this.profileImage = this.ImageUrl +"/"+ this.EmployeeLoginView.empProfilePicture;
      this.EmployeeName = this.EmployeeLoginView.empName;
  }
  }
  
