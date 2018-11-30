import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {

  constructor(private repository: RepositoryService) { }
  public employeeForm: FormGroup;

  ngOnInit() {
   this.employeeForm = new FormGroup({
      employeeId: new FormControl('',[Validators.required]),
      employeeName: new FormControl('',[Validators.required]),
      employeeParticipate: new FormControl('',[Validators.required]),
     })
  }

  public validateControl(controlName: string) {
    if (this.employeeForm.controls[controlName].invalid && this.employeeForm.controls[controlName].touched)
      return true;

    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.employeeForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }
  
  public employeeData(value){
    console.log(value);
  }
  show = false;
  clickone(){
      this.show = true;
  }
  clicktwo(){
    this.show = false;
}

}


