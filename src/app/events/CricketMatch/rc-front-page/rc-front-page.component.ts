import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rc-front-page',
  templateUrl: './rc-front-page.component.html',
  styleUrls: ['./rc-front-page.component.css']
})
export class RcFrontPageComponent implements OnInit {

  constructor(private repository: RepositoryService ) { }
  public rcFront: FormGroup;

  ngOnInit() {
    this.rcFront = new FormGroup({
      rcFrontId: new FormControl('',[Validators.required]),
      rcFrontmainTopic: new FormControl('',[Validators.required]),
      rcFrontsubTopic: new FormControl('',[Validators.required]),
      rcFrontdate: new FormControl('',[Validators.required]),
      rcFronttime: new FormControl('',[Validators.required]),
      rcFrontplace: new FormControl('',[Validators.required]),
      rcFrontrLastday: new FormControl('',[Validators.required]),
      rcFrontcontent1: new FormControl('',[Validators.required]),
      rcFrontcontent2: new FormControl(''),
     })
  }

  

  public validateControl(controlName: string) {
    if (this.rcFront.controls[controlName].invalid && this.rcFront.controls[controlName].touched)
      return true;

    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.rcFront.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public rcFrontData(value){
    console.log(value);
    let formData = new FormData();
    formData.append('CriEventId', value.rcFrontId);
    formData.append('CriEventMainTopic',value.rcFrontmainTopic);
    formData.append('CriEventSubTopic', value.rcFrontsubTopic);
    formData.append('CriEventDate',value.rcFrontdate);
    formData.append('CriEventTime', value.rcFronttime);
    formData.append('CriEventPlace',value.rcFrontplace);
    formData.append('CriEventDeadLine',value.rcFrontrLastday);
    formData.append('CriEventContent1', value.rcFrontcontent1);
    formData.append('CriEventContent2',value.rcFrontcontent2);
    
    let apiUrl = 'event/addfrontpage';
    
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
