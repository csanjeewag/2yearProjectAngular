
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router } from '@angular/router';
 
  
  @Component({
    selector: 'app-add-event-type',
    templateUrl: './add-event-type.component.html',
    styleUrls: ['./add-event-type.component.css']
  })
  export class AddEventTypeComponent implements OnInit {
  
    constructor(private router: Router,  private repository : RepositoryService) { }
    
    public EventType: FormGroup;
    public Message:any;
    
    ngOnInit() {
      this.EventType = new FormGroup({
        EventTypeId: new FormControl('',[Validators.required]),
        EventTypeName: new FormControl('',[Validators.required]),
        EventTypeDescription: new FormControl('',[Validators.required]),
       
       })
    }
  
    public validateControl(controlName: string) {
      if (this.EventType.controls[controlName].invalid && this.EventType.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.EventType.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
  
    public createrole(value) {
     
      if (this.EventType.valid) {
        
      let formdata = new FormData;
      formdata.append('EventTypeId',value.EventTypeId);
      formdata.append('EventTypeName',value.EventTypeName);
      formdata.append('EventTypeDescription',value.EventTypeDescription);   
        
       
        let apiUrl = 'eventtype/createEventType';
        
        this.repository.postFile(apiUrl, formdata)
          .subscribe(res =>  {
            this.Message="Event Type Created!";
             //   this.router.navigate(['/profile/admin/roles']);
             
         
            },
            (error => {
              this.Message="Event Type Created Failed,Try Again!";
            })
          )
      
      }
    }
  
    public redirectToOwnerList(){
      
      this.EventType = new FormGroup({
        EventTypeId: new FormControl('',[Validators.required]),
        EventTypeName: new FormControl('',[Validators.required]),
        EventTypeDescription: new FormControl('',[Validators.required]),
       
       })
    }
  
  }
  