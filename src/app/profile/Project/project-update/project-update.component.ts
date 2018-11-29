
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute } from '@angular/router';
  
  @Component({
    selector: 'app-project-update',
    templateUrl: './project-update.component.html',
    styleUrls: ['./project-update.component.css']
  })
  export class ProjectUpdateComponent implements OnInit {
  
  
    constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }
  
    public projectForm: FormGroup;
    public Message:any;
    public project:any;
    public projectID:any;
    ngOnInit() {
      this.getproject();
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
  
    public updateproject(value) {
  
      if (this.projectForm.valid) {
        
        let formdata = new FormData;
        formdata.append('ProjectId',value.projectId);
        formdata.append('ProjectName',value.projectName);
        formdata.append('ProjectDescription',value.projectDescription);   
          
         
    
        let apiUrl = 'project/updateproject';
        
        this.repository.postFile(apiUrl, formdata)
          .subscribe(res =>  {
            this.Message="Project updated!";
              this.router.navigate(['/profile/admin/projects']);
         
            },
            (error => {
              this.Message="project updated Failed,Try Again!";
            })
          )
      
      }
    }

    public getproject(){

      
        this.projectID = this.route.snapshot.paramMap.get('id')
        console.log(this.projectID)
        
        this.repository.getData('project/getproject/'+this.projectID)
        .subscribe(res => {
          this.project = res ;
          console.log(res)
          this.fillproject();
        },
        (error) => {
        //  this.handleErrors(error);n
        })
       
     
    }
  
    public fillproject(){
      this.projectForm.controls['projectId'].setValue(this.project.projectId);
      this.projectForm.controls['projectName'].setValue(this.project.projectName);
      this.projectForm.controls['projectDescription'].setValue(this.project.projectDescription);
    }
    public redirectToOwnerList(){
      this.router.navigate(['/profile/admin/projects']);
      
     }
    
  }
  
