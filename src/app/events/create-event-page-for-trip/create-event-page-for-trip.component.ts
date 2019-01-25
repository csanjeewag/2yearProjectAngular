import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Event} from './../_interfaces/event';
import {  RepositoryService} from './../../ShareData/repository.service';
import { $ } from 'protractor';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-event-page-for-trip',
  templateUrl: './create-event-page-for-trip.component.html',
  styleUrls: ['./create-event-page-for-trip.component.css']
})
export class CreateEventPageForTripComponent implements OnInit {
  public errorMessage: string='';
    public eventForm: FormGroup;
    public msg: any;
    public sameEvent:any;

   
    eventTypes = [{'id':'OneDayTrip', 'name':'One day trip'}, {'id':'TwoDayTrip', 'name': 'Two day trip'}, {'id':'BloodDonation', 'name':'Blood donation'}, {'id':'YearEndParty', 'name': 'Year end party'}];

  constructor(private repository : RepositoryService) { }

  ngOnInit() {

    this.eventForm = new FormGroup({
     
      eventTitle:new FormControl('',[Validators.required]),
      eventDescription:new FormControl('',[Validators.required]),
      destination:new FormControl('',[Validators.required]),
      startDate:new FormControl('',[Validators.required]),
      endDate:new FormControl('',[Validators.required]),
      type:new FormControl('',[Validators.required]),
      closingDate:new FormControl('',[Validators.required]),
     
    })

  }

  public validateControl(controlName: string) {
    if (this.eventForm.controls[controlName].invalid && this.eventForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.eventForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }
  public touchanddirty(controlName: string) {
    if (this.eventForm.controls[controlName].value !=="" && this.eventForm.controls[controlName].touched )
      return true;

    return false;
  }

  public createEvent(eventFormValue) {
   
    var date = new Date();
    var date1 = date.toString();
    var year = date1.split(' ')[3];
    
    
    if (this.eventForm.valid) {

        if(eventFormValue.endDate>=eventFormValue.startDate){
           if(eventFormValue.closingDate<eventFormValue.startDate){
               this.executeEventCreation(eventFormValue);
           }else{
           window.alert("Can't create event. Check the event date and closing date for registration.");
           }
        }else{
        window.alert("Can't create event. Check the start date and end date.");
        }

    }
  }

  private executeEventCreation(eventFormValue) {
  
    // let event: Event = {
    //   eventTitle: eventFormValue.eventTitle,
    //   eventDescription: eventFormValue.eventDescription,
    //   destination:eventFormValue.destination,
    //   startDate: eventFormValue.startDate,
    //   endDate: eventFormValue.endDate,
    //   closingDate:eventFormValue.closingDate,
    //   type:eventFormValue.type,
    // };

     
    let apiUrl = 'event/createEvent';
    this.repository.postData(apiUrl, event)
      .subscribe(res => {
          window.alert("Event is successfully created");
        },
        (error => {
          this.msg="Can't create event! Please check entered details again";
        
        })
      )
    /*this.repository.getData('event/checkEvent/'+event.pKey)
    .subscribe(res => {
      this.sameEvent = res ;
      var myObjStr = JSON.stringify(res);
      this.eEvent(event);
      console.log(this.sameEvent);

    },
    (error) => {
    //  this.handleErrors(error);n

   
  
    
    })*/

   
    
  }
/*
  private eEvent(event){
    if(this.sameEvent){
      
      let apiUrl = 'event/createEvent';
      this.repository.postData(apiUrl, event)
        .subscribe(res => {
            window.alert("Event is successfully created");
          },
          (error => {
            this.msg="Can't create event! Please check entered details again";
          
          })
        )
   
    }else{
     
      window.alert("Can't create event. There is already existing event with same details.");
      console.log(this.sameEvent);
       
    }
  }*/


}
