import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';

import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import { Department } from '../_interfaces/department';
import { Role } from '../_interfaces/role';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(private router: Router,  private repository : RepositoryService) { }

  public positionForm: FormGroup;
  public Message:any;
  ngOnInit() {
    this.positionForm = new FormGroup({
      positionId: new FormControl('',[Validators.required]),
      positionName: new FormControl('',[Validators.required]),
      positionDis: new FormControl('',[Validators.required])

     })
  }

  public validateControl(controlName: string) {
    if (this.positionForm.controls[controlName].invalid && this.positionForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.positionForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public createrole(PositionFormvalue) {
    this.router.navigate(['/profile/admin']);
    if (this.positionForm.valid) {
      
      let positions: Role = {
        PositionId:PositionFormvalue.positionId,
        PositionName:PositionFormvalue.positionName,
        positionDis:PositionFormvalue.positionDis
       
      };
  
      let apiUrl = 'createposition';
      
      this.repository.postData(apiUrl, positions)
        .subscribe(res =>  {
          this.Message="role Created!";
              this.router.navigate(['/profile/admin/roles']);
           // location.reload();
       
          },
          (error => {
            this.Message="role Created Failed,Try Again!";
          })
        )
    
    }
  }

  public redirectToOwnerList(){
    // this.router.navigate(['/profile/list']);
    this.positionForm = new FormGroup({
      positionId: new FormControl('',),
      positionName: new FormControl('',),
      positionDis: new FormControl('',)

     })
  }
}
