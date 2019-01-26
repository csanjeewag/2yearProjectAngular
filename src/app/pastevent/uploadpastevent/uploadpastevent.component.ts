import { Component, OnInit } from '@angular/core';
import {  RepositoryService} from './../../ShareData/repository.service';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { AuthServiceService } from "../../AuthGards/auth-service.service";
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-uploadpastevent',
  templateUrl: './uploadpastevent.component.html',
  styleUrls: ['./uploadpastevent.component.css']
})
export class UploadpasteventComponent implements OnInit {
  public eventid:any;


  constructor(private repo: RepositoryService, private repository: RepositoryService, private route: Router,private auth:AuthServiceService, private rout:ActivatedRoute) { }
public summaryForm : FormGroup
  ngOnInit() {
    this.eventid=this.rout.snapshot.paramMap.get('id') 

    this.summaryForm = new FormGroup({
    
     
      summary: new FormControl('',[Validators.required]),
      treasurer: new FormControl('',[Validators.required]),
      Real_Budget: new FormControl('',[Validators.required]),

     })
  }

  OnSubmit(value){
    console.log(value)
    let url =" pastevent/upgradeevent";
    let formData = new FormData();
       formData.append('EventId',this.eventid);
       formData.append('EventDescription',value.summary);
      //  formData.append('',value.treasurer);
      //  formData.append('',value.Real_Budget);
      console.log(this.eventid);
       this.repository.postData(url,formData)
       .subscribe(res => {
         
       }, (error => {

       })
       )
  }
    
   

}
