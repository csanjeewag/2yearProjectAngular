
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../../ShareData/repository.service';
  import { Router ,ParamMap, ActivatedRoute} from '@angular/router';
  import { Role } from './../../_interfaces/role';
  
  @Component({
    selector: 'app-update-roles',
    templateUrl: './update-roles.component.html',
    styleUrls: ['./update-roles.component.css']
  })
  export class UpdateRolesComponent implements OnInit {
  
    constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }
  
    public positionForm: FormGroup;
    public Message:any;
    public RoleId:any;
    public roles:any;
    
    ngOnInit() {
      this.getDepartment();

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
  
    public updaterole(PositionFormvalue) {
  
      if (this.positionForm.valid) {
        
        let positions: Role = {
          PositionId:PositionFormvalue.positionId,
          PositionName:PositionFormvalue.positionName,
          positionDis:PositionFormvalue.positionDis
         
        };
    
        let apiUrl = 'position/updateposition';
        
        this.repository.postData(apiUrl, positions)
          .subscribe(res =>  {
            this.repository.SuccessAlert("Position updated!");
               this.router.navigate(['/profile/admin/roles']);
         
            },
            (error => {
              this.repository.errorAlert("Position updated Failed,Try Again!");
            })
          )
      
      }
    }
    public getDepartment(){

      
      this.RoleId = this.route.snapshot.paramMap.get('id')
     
      
      this.repository.getData('position/getposition/'+this.RoleId)
      .subscribe(res => {
        this.roles = res ;
       
        this.fillERoles();
      },
      (error) => {
      //  this.handleErrors(error);n
      })
     
   
  }

  public fillERoles(){
    this.positionForm.controls['positionId'].setValue(this.roles.positionId);
    this.positionForm.controls['positionName'].setValue(this.roles.positionName);
    this.positionForm.controls['positionDis'].setValue(this.roles.positionDis);

  }
    
    public redirectToOwnerList(){
      this.router.navigate(['/profile/admin/roles']);
      
     }
  }
  