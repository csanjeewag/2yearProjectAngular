
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router } from '@angular/router';
  
  
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    constructor(private router: Router,  private repository : RepositoryService) { }
    
    public EventForm: FormGroup;
    public Message:any;
    public eventtypes:any;
    public des:any;
    
    ngOnInit() {

      this.des=true;

      this.getEvents();
      this.EventForm = new FormGroup({
        EventId: new FormControl('',[Validators.required]),
        EventName: new FormControl('',[Validators.required]),
        EventType: new FormControl('',[Validators.required]),
        EventStartDate: new FormControl('',[Validators.required]),
        EventEndDate: new FormControl('',[Validators.required]),
        EventClosingDate: new FormControl('',[Validators.required]),
        EventDescription: new FormControl('',[Validators.required]),
       })
    }
  
    public validateControl(controlName: string) {
      if (this.EventForm.controls[controlName].invalid && this.EventForm.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.EventForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
  
    public createrole(value) {
    
     
      if (this.EventForm.valid) {
        
      let formdata = new FormData;
      formdata.append('EventId',value.EventId);
      formdata.append('EventName',value.EventName);
      formdata.append('EventTypeId',value.EventType);   
      formdata.append('EventStartDate',value.EventStartDate);
      formdata.append('EventEndDate',value.EventEndDate);
      formdata.append('EventClosingDate',value.EventClosingDate);   
      formdata.append('EventDescription',value.EventDescription); 
      
       
        let apiUrl = 'event/createevent';
        
        this.repository.postFile(apiUrl, formdata)
          .subscribe(res =>  {
            this.Message="Event Created!";
             //   this.router.navigate(['/profile/admin/roles']);
             
         
            },
            (error => {
              this.Message="Event Created Failed,Try Again!";
            })
          )
      
      }
    }
  
    public redirectToOwnerList(){
      
      this.EventForm = new FormGroup({
        EventId: new FormControl('',[Validators.required]),
        EventName: new FormControl('',[Validators.required]),
        EventType: new FormControl('',[Validators.required]),
       
       })
    }
    public getEvents(){
      let apiUrl = 'eventtype/getalleventtypes';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.eventtypes = res;
        
            console.log(res)
          },
          (error => {
        
          })
        )
    }
  
  }
  