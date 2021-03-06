import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';

import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';
import { Role } from '../../_interfaces/role';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(private router: Router,  private repository : RepositoryService) { }
  
  public positionForm: FormGroup;
  public Message:any;
  public F:File;
  ngOnInit() {
    this.positionForm = new FormGroup({
      positionId: new FormControl('',[Validators.required]),
      positionName: new FormControl('',[Validators.required]),
      positionDis: new FormControl('',[Validators.required]),
     // image: new FormControl('')

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
        positionDis:PositionFormvalue.positionDis,
      
       
      };
      
     
      let apiUrl = 'position/createposition';
      
      this.repository.postData(apiUrl, positions)
        .subscribe(res =>  {
          this.repository.SuccessAlert("Position Created!");
              this.router.navigate(['/profile/admin/roles']);
           this.fill();
       
          },
          (error => {
            this.repository.errorAlert("Position Created Failed,Try Again!");
          })
        )
    
    }
  }

  public redirectToOwnerList(){
    
    this.positionForm = new FormGroup({
      positionId: new FormControl('',),
      positionName: new FormControl('',),
      positionDis: new FormControl('',)
      
     })
  }
  public fill(){
    this.positionForm.controls['positionId'].setValue('');
    this.positionForm.controls['positionName'].setValue('');
    this.positionForm.controls['positionDis'].setValue('');

  }

}
