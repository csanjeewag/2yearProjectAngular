import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import{Info} from './../_interfaces/Info';
@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {

  fileToUpload: File = null;

  public InfoForm: FormGroup;
  constructor(private router: Router,  private repository : RepositoryService) { }

  ngOnInit() {
    this.InfoForm = new FormGroup({        
    
      type:  new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      address: new FormControl(''),
      cost: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      
      },
      //{ validators: isvalidconfirmpassword }
      );
  }
  public addTaskInfo(InfoFormValue) {
    console.log(InfoFormValue)
    if (this.InfoForm.valid) {
      this.executeInfoCreation(InfoFormValue);

    }
  }

  private executeInfoCreation(InfoFormValue) {
    let t: Info = {
      infoId:1,
      type: InfoFormValue.type,
      name:InfoFormValue.name,
      address: InfoFormValue.address,
      cost: InfoFormValue.cost,
      description: InfoFormValue.description,

    };

    let apiUrl = '/task/create';
    this.repository.postData(apiUrl,t)
        .subscribe(res => {
          this.router.navigate(['/task/list']);
            
          },
          (error => {
          //  this.errorHandler.handleError(error);
          //  this.errorMessage = this.errorHandler.errorMessage;
          })
        )

        alert("Successfully recorded");
    }
   
   /* public redirectToTaskList(){
      this.router.navigate(['task']);
    }*/

    public validateControl(controlName: string) {
      if (this.InfoForm.controls[controlName].invalid && this.InfoForm.controls[controlName].touched)
        return true;
  
      return false;
    }
    public hasError(controlName: string, errorName: string) {
      if (this.InfoForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }

    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }
    


}
