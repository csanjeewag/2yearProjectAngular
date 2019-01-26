  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../../ShareData/repository.service';
  import { Router } from '@angular/router';
  import { Department } from '../../_interfaces/department';
  import { Role } from '../../_interfaces/role';
  
  @Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrls: ['./project-create.component.css']
  })
  export class ProjectCreateComponent implements OnInit {

    constructor(private router: Router,  private repository : RepositoryService) { }
    
    public projectForm: FormGroup;
    public Message:any;
    
    ngOnInit() {
      this.projectForm = new FormGroup({
        projectId: new FormControl('',[Validators.required]),
        projectName: new FormControl('',[Validators.required]),
        projectDescription: new FormControl('',[Validators.required]),
       
       })
    }
  
    public validateControl(controlName: string) {
      if (this.projectForm.controls[controlName].invalid && this.projectForm.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.projectForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
  
    public createrole(value) {
     
      this.router.navigate(['/profile/admin']);
      if (this.projectForm.valid) {
        
      let formdata = new FormData;
      formdata.append('ProjectId',value.projectId);
      formdata.append('ProjectName',value.projectName);
      formdata.append('ProjectDescription',value.projectDescription);   
        
       
        let apiUrl = 'Project/createproject';
        
        this.repository.postFile(apiUrl, formdata)
          .subscribe(res =>  {
            this.Message="project Created!";
                this.router.navigate(['/profile/admin/project']);
             this.fill();
         
            },
            (error => {
              this.Message="role Created Failed,Try Again!";
            })
          )
      
      }
    }
  
    public redirectToOwnerList(){
      
      this.projectForm = new FormGroup({
        projectId: new FormControl('',[Validators.required]),
        projectName: new FormControl('',[Validators.required]),
        projectDescription: new FormControl('',[Validators.required]),
       
       })
    }

    public fill(){
      this.projectForm.controls['projectId'].setValue('');
      this.projectForm.controls['projectName'].setValue('');
      this.projectForm.controls['projectDescription'].setValue('');
    }
  
  }
  