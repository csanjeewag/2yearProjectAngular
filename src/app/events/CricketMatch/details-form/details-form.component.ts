import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';

// hello

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {

  constructor(private repository: RepositoryService ) { }
  public detailsAddForm: FormGroup;
  
  ngOnInit() {
     this.detailsAddForm = new FormGroup({
       addyear: new FormControl('',[Validators.required]),
       addwinner: new FormControl('',[Validators.required]),
       addrunnerup: new FormControl('',[Validators.required]),
       addnumberTeam: new FormControl('',[Validators.required]),
       addbestplayer: new FormControl('',[Validators.required]),
       addbestbatter: new FormControl('',[Validators.required]),
       addbestballer: new FormControl('',[Validators.required]),
     })
  }

  public validateControl(controlName: string) {
    if (this.detailsAddForm.controls[controlName].invalid && this.detailsAddForm.controls[controlName].touched)
      return true;

    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.detailsAddForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

   public detailsAddData(value){
     console.log(value);
     let formData = new FormData();
     formData.append('', value.addyear);
     formData.append('', value.addwinner);
     formData.append('', value.addrunnerup);
     formData.append('', value.addnumberTeam);   
     formData.append('', value.addbestplayer);
     formData.append('', value.addbestbatter);
     formData.append('', value.addbestballer);

     let apiUrl = 'event/adddetailspage';

     this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
          console.log("data submitted");
          },
          (error => {
            console.log("data not submitted");
          })
        )

   }

}


