import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../../ShareData/repository.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors,AsyncValidatorFn } from '@angular/forms';
 

@Component({
  selector: 'app-employee-password-change',
  templateUrl: './employee-password-change.component.html',
  styleUrls: ['./employee-password-change.component.css']
})
export class EmployeePasswordChangeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }

  public Form: FormGroup;
  public message:any;
  public waiting:any;
  public empEmail:any;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.empEmail = params['email'];
  });

    this.Form = new FormGroup({
      email:new FormControl(this.empEmail),
      oldpassword:new FormControl('',[Validators.required]),
      newpassword:new FormControl('',[Validators.required]),
      confirmpassword:new FormControl('',[Validators.required]),
    },{ validators: isvalidconfirmpassword })

  }

  public validateControl(controlName: string) {
    if (this.Form.controls[controlName].invalid && this.Form.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.Form.controls[controlName].hasError(errorName))
      return true;

    return false;
  }
  public touchanddirty(controlName: string) {
    if (this.Form.controls[controlName].value !=="" && this.Form.controls[controlName].touched )
      return true;

    return false;
  }

  public submitform(value) {
    this.waiting=true;
    if (this.Form.valid) {
      let formData = new FormData();
      formData.append('EmployeeEmail', value.email);
      formData.append('EmployeeOldPassword',value.oldpassword);
      formData.append('EmployeeNewPassword', value.newpassword);
     
    
    let apiUrl = 'employee/changepasswordemployee';
    
          this.repository.postFile(apiUrl, formData)
            .subscribe(res => {
              this.waiting=false;
              alert("password change success!");
              this.message = "password change success!";
              this.router.navigate(['/profile/profile']);
              },
              (error => {
                this.waiting=false;
                this.message = "password change failed, try again!";
              })
            )
      }
  }

}

export const isvalidconfirmpassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('newpassword');
  const confirmpassword = control.get('confirmpassword');
  
  return password && confirmpassword && password.value !== confirmpassword.value && confirmpassword.value !== ""? { 'ismatch': true } : null;
};