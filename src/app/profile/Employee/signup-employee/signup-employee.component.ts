
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors,AsyncValidatorFn } from '@angular/forms';
  import { Employee} from './../../_interfaces/employee.model';
  import {  RepositoryService} from './../../../ShareData/repository.service';
  import { Router } from '@angular/router';
  import { LoginUserInterfaceComponent } from "./../../login-user-interface/login-user-interface.component";
  import { EmailCheck } from "./../../_interfaces/email-check";
  import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { ok } from 'assert';


  @Component({
    selector: 'app-signup-employee',
    templateUrl: './signup-employee.component.html',
    styleUrls: ['./signup-employee.component.css']
  })
  export class SignupEmployeeComponent implements OnInit {
  
    public errorMessage: string='';
    public ownerForm: FormGroup;
    public departments:any;
    public roles:any;
    public isAvalibleemail:boolean;
    public IsLogin:any;
    public message:any;
    public wait:any;
    public FileImage : File;
    public ImageUrl = "assets/_image/cslogo.png";
    
   
    
    constructor(private router: Router,  private repository : RepositoryService,private logcomponent:LoginUserInterfaceComponent) { }
  
    ngOnInit() {

      
      this.getRoles();
      this.getDepartment();
      //file
     
    
      this.ownerForm = new FormGroup({
        id:new FormControl('',[Validators.required,Validators.maxLength(6)]),
        name:new FormControl('',[Validators.required]),
        contact:new FormControl('',[Validators.required, Validators.pattern(/[0-9'-]$/)]),
        address1:new FormControl('',[Validators.required]),
        address2:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
        confirmpassword: new FormControl ('',[Validators.required]),
        password:new FormControl('',[Validators.required]),      
        department:new FormControl('',[Validators.required]),
        gender:new FormControl('',[Validators.required])
      },{ validators: isvalidconfirmpassword })
    }
  
    public validateControl(controlName: string) {
      if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.ownerForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
    public touchanddirty(controlName: string) {
      if (this.ownerForm.controls[controlName].value !=="" && this.ownerForm.controls[controlName].touched )
        return true;
  
      return false;
    }
   

    public createOwner(ownerFormValue) {
      if (this.ownerForm.valid) {
        this.shouldBeUnique('email');
        this.executeOwnerCreation(ownerFormValue);
        this.wait = true;
        this.IsLogin = false;
       
      }
    }
  
    private executeOwnerCreation(value) {
      // let owner: Employee = {
      //   EmpId: ownerFormValue.id,
      //   EmpName: ownerFormValue.name,
      //   EmpContact: ownerFormValue.contact,
      //   EmpAddress1: ownerFormValue.address1,
      //   EmpAddress2: ownerFormValue.address2,
      //   EmpEmail: ownerFormValue.email,
      //   PositionPId: '',
      //   EmpPassword:  ownerFormValue.password,
      //   DepartmentDprtId: ownerFormValue.department,
      //   EmpGender: ownerFormValue.gender,
      // };

      let formData = new FormData();
      formData.append('EmpId', value.id);
      formData.append('EmpName',value.name);
      formData.append('EmpContact', value.contact);
      formData.append('EmpAddress1',value.address1);
      formData.append('EmpAddress2', value.address2);
      formData.append('EmpEmail',value.email);
      formData.append('PositionPId', '');
      formData.append('EmpPassword',value.password);
      formData.append('DepartmentDprtId', value.department);
      formData.append('EmpGender',value.gender);
      formData.append('EmpProfilePicture',this.FileImage);

      let apiUrl = 'employee/create';
    
      this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
          this.IsLogin = true;
          this.logcomponent.loginEmail = value.email;
           this.wait = false;
           this.message = ""
          },
          (error => {
            this.IsLogin= false;
            this.wait = false;
            this.message = "Registration failed, try again!"
          })
        )
    }
  
    public redirectToOwnerList(){
      this.router.navigate(['/profile/login']);
      this.logcomponent.IsHaveAccount = true;
    }
    
    public getDepartment(){

      let apiUrl = 'department/getdepartments';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.departments = res;
        
            
          },
          (error => {
        
          })
        )
    }

    public getRoles(){

      let apiUrl = 'position/getroles';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.roles = res;
         
            
          },
          (error => {
        
          })
        )
    }

    public  shouldBeUnique(controlName: string ){
        
      let isunique;
      let apiUrl = 'employee/isuniqueemail';
      let loginuse: EmailCheck = {
       Email: this.ownerForm.controls[controlName].value
     }
    

   this.repository.postData(apiUrl,loginuse)
         .subscribe(res=>{
           console.log(res);
           if(res==true)
           {this.isAvalibleemail=true }
           else 
           { }
         },(error => {
          
          
         })
         )

     }
//file
onFileChange(file : FileList,id:number) {
    

  this.FileImage = file.item(0);
 //selected image viewing
  var reader = new FileReader();
  reader.onload = (event:any) => {
     this.ImageUrl = event.target.result;

     console.log(event.target.result)
  }
   reader.readAsDataURL(this.FileImage);
}
}
  





export const isvalidconfirmpassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmpassword = control.get('confirmpassword');
  
  return password && confirmpassword && password.value !== confirmpassword.value && confirmpassword.value !== ""? { 'ismatch': true } : null;
};

