
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
  import { Employee} from './../_interfaces/employee.model';
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router } from '@angular/router';
  import { LoginUserInterfaceComponent } from "./../login-user-interface/login-user-interface.component";
  
  

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
   
   
  
    constructor(private router: Router,  private repository : RepositoryService,private logcomponent:LoginUserInterfaceComponent) { }
  
    ngOnInit() {

      this.getRoles();
      this.getDepartment();

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
        this.executeOwnerCreation(ownerFormValue);
       
      }
    }
  
    private executeOwnerCreation(ownerFormValue) {
      let owner: Employee = {
        EmpId: ownerFormValue.id,
        EmpName: ownerFormValue.name,
        EmpContact: ownerFormValue.contact,
        EmpAddress1: ownerFormValue.address1,
        EmpAddress2: ownerFormValue.address2,
        EmpEmail: ownerFormValue.email,
        PositionPId: 'RC',
        EmpPassword:  ownerFormValue.password,
        DepartmentDprtId: ownerFormValue.department,
        EmpGender: ownerFormValue.gender,
      };
  
      let apiUrl = 'create';
    
      this.repository.postData(apiUrl, owner)
        .subscribe(res => {
          this.router.navigate(['/profile/list']);
            
          },
          (error => {
          //  this.errorHandler.handleError(error);
          //  this.errorMessage = this.errorHandler.errorMessage;
          })
        )
    }
  
    public redirectToOwnerList(){
      this.router.navigate(['/profile/login']);
      this.logcomponent.IsHaveAccount = true;
    }
    
    public getDepartment(){

      let apiUrl = 'getdepartments';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.departments = res;
        
            
          },
          (error => {
        
          })
        )
    }

    public getRoles(){

      let apiUrl = 'getroles';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.roles = res;
         
            
          },
          (error => {
        
          })
        )
    }

      
 

}
  
function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
      return { 'ageRange': true };
  }
  return null;
} 

export const isvalidconfirmpassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmpassword = control.get('confirmpassword');
  
  return password && confirmpassword && password.value === confirmpassword.value && confirmpassword.value !== ""? { 'ismatch': true } : null;
};