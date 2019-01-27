import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";
  
@Component({
  selector: 'app-select-attribute',
  templateUrl: './select-attribute.component.html',
  styleUrls: ['./select-attribute.component.css']
})
export class SelectAttributeComponent implements OnInit {

  constructor(private auth: AuthServiceService,private router: Router,  private repository : RepositoryService,private rou:ActivatedRoute) { }
  public EventForm: FormGroup;
  public Message:any;
  public EventId:any;
  public urlAddress:any;
  public attribute:any;
  ngOnInit() {
   // this.getparamId();
console.log("IN THE SELECT ATTRIBUTE component. reding event id"+this.repository.eventId);
  this.getAttribute();
    this.EventForm = new FormGroup({
    
      EndDate: new FormControl(''),
      ClosingDate: new FormControl(''),
      Destination: new FormControl(''),
      Liquor: new FormControl(''),
      IsFamilyMembersAllowed: new FormControl(''),
      Venue: new FormControl(''),
      NumberOfTeams: new FormControl(''),
      budgetedCost: new FormControl(''),
      actualCost: new FormControl(''),
      mainOrganiZer: new FormControl(''),
      summary: new FormControl(''),
      })
  }


  public createrole(value) {
    
     
    
    let formdata = new FormData;
    formdata.append('Id',this.attribute.id);
    formdata.append('EventId',this.repository.eventId);
    formdata.append('EndDate',value.EndDate);
    formdata.append('ClosingDate',value.ClosingDate);
    formdata.append('Destination',value.Destination);
    formdata.append('Liquor',value.Liquor);
    formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed);
    formdata.append('Venue',value.Venue);
    formdata.append('NumberOfTeams',value.NumberOfTeams);
    formdata.append('BudgetedCost',value.budgetedCost); 
    formdata.append('ActualCost',value.actualCost);
    formdata.append('MainOrganiZer',value.mainOrganiZer);
    formdata.append('Summary',value.summary);
    

   
      let apiUrl = 'event/upselectAttributes';
      
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {
          //this.Message="attribute updated!";
          this.urlAddress = "events/addevent/"+this.repository.eventId;
          this.router.navigate([this.urlAddress]);
           //   this.router.navigate(['/profile/admin/roles']);
           
       
          },
          (error => {
            this.Message="Event Created Failed,Try Again!";
          })
        )
    
    
  }

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      console.log("get the  param id"+id)
      this.EventId=id;
      this.getAttribute();
     });

  }
 



  public getAttribute(){
    let apiUrl = 'event/getatribute/'+this.repository.eventId;
    console.log("inside get attribute")
    this.repository.getData(apiUrl)
      .subscribe(res => {
       this.attribute = res;
      console.log("this is the attribute returned"+res)
          this.fiilEvent();
        },
        (error => {
      
        })
      )
  }
  public fiilEvent(){
    this.EventForm.controls['Destination'].setValue(this.attribute.destination);
     this.EventForm.controls['EndDate'].setValue(this.attribute.endDate);
    this.EventForm.controls['ClosingDate'].setValue(this.attribute.closingDate);
    this.EventForm.controls['IsFamilyMembersAllowed'].setValue(this.attribute.isFamilyMembersAllowed);
    this.EventForm.controls['NumberOfTeams'].setValue(this.attribute.numberOfTeams);
    this.EventForm.controls['Venue'].setValue(this.attribute.venue);
    this.EventForm.controls['Liquor'].setValue(this.attribute.liquor);
    this.EventForm.controls['budgetedCost'].setValue(this.attribute.budgetedCost);
    this.EventForm.controls['actualCost'].setValue(this.attribute.actualCost);
    this.EventForm.controls['mainOrganiZer'].setValue(this.attribute.mainOrganiZer);
    this.EventForm.controls['summary'].setValue(this.attribute.summary);
    console.log("liquor = ")
    

  }


}
