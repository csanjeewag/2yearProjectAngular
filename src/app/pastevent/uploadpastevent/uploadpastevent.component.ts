import { Component, OnInit } from '@angular/core';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-uploadpastevent',
  templateUrl: './uploadpastevent.component.html',
  styleUrls: ['./uploadpastevent.component.css']
})
export class UploadpasteventComponent implements OnInit {

  constructor() { }
public summaryForm : FormGroup
  ngOnInit() {
    
    this.summaryForm = new FormGroup({
      EventId: new FormControl('',[Validators.required]),
      TypeId: new FormControl('',[Validators.required]),
      summary: new FormControl('',[Validators.required]),
      treasurer: new FormControl('',[Validators.required]),
     // Chairman: new FormControl('',[Validators.required]),
      Real_Budget: new FormControl('',[Validators.required]),

     })
  }
  public createrole(value) {
    console.log(value);
  }
    
   

}
