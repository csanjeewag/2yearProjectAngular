
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router ,ParamMap, ActivatedRoute} from '@angular/router';
  import { Role } from '../_interfaces/role';
  
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
  
    public createrole(PositionFormvalue) {
  
      if (this.positionForm.valid) {
        
        let positions: Role = {
          PositionId:PositionFormvalue.positionId,
          PositionName:PositionFormvalue.positionName,
          positionDis:PositionFormvalue.positionDis
         
        };
    
        let apiUrl = 'updateposition';
        
        this.repository.postData(apiUrl, positions)
          .subscribe(res =>  {
            this.Message="role updated!";
              //  this.router.navigate(['/profile/list']);
         
            },
            (error => {
              this.Message="role updated Failed,Try Again!";
            })
          )
      
      }
    }
    public getDepartment(){

      
      this.RoleId = this.route.snapshot.paramMap.get('id')
      console.log(this.RoleId)
      
      this.repository.getData('getposition/'+this.RoleId)
      .subscribe(res => {
        this.roles = res ;
        console.log(res)
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
      this.router.navigate(['/profile/list']);
    }
  }
  