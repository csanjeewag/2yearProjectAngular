import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute } from '@angular/router';
  import { Event } from './../_interfaces/Event';
  

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }

  public projectForm: FormGroup;
    public Message:any;
    public eventtypes:any;
    public projectID:any;
    public PrId:any;
    public event:any;
    public attribute:any;
    public urlAddress:any;

    public endDate:any;
    public closingDate:any;
    public destination:any;
    public liquor:any;
    public isFamilyMembersAllowed: any;
    public numberOfTeams: any;
   public venue: any;
    
  
  ngOnInit() {
    this.getEvents();
    this.getparamId();
    this.getproject();
      this.projectForm = new FormGroup({
        EventTitle: new FormControl('',[Validators.required]),
        EventType: new FormControl('',[Validators.required]),
        StartDate: new FormControl('',[Validators.required]),
        EventDescription: new FormControl('',[Validators.required]),
        EndDate: new FormControl(''),
        ClosingDate: new FormControl(''),
        IsFamilyMembersAllowed: new FormControl(''),
        Liquor: new FormControl(''),
        Venue: new FormControl(''),
        NumberOfTeams: new FormControl(''),
        Destination:new FormControl(''),
       })
       this.endDate =false;
      this.closingDate=false;
      this.destination=false;
      this.liquor=false;
      this.isFamilyMembersAllowed=false;
      this.numberOfTeams=false;
      this.venue=false;
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
     formdata.append('Id',this.PrId);
     formdata.append('EventTitle',value.EventTitle);
     formdata.append('EventTypeId',value.EventType);   
     formdata.append('StartDate',value.StartDate);
     formdata.append('EventDescription',value.EventDescription); 
    formdata.append('EndDate',value.EndDate);
    formdata.append('ClosingDate',value.ClosingDate);
    formdata.append('NumberOfTeams',value.NumberOfTeams);
    formdata.append('Liquor',value.Liquor); 
   formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed);
   formdata.append('Venue',value.Venue);
   formdata.append('Destination',value.Destination);

   
     
          let apiUrl = 'event/updateevent';
      console.log("formdata"+formdata)
      console.log("description = "+value.EventDescription)
      
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {
          this.Message="Project updated!";
          console.log("response = "+res)
            //this.router.navigate(['/profile/admin/project']);
       
          },
          (error => {
            this.Message="Failed,";
          })
        )
    
    }
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
  
  public fillproject(){
    this.projectForm.controls['EventTitle'].setValue(this.event.eventTitle);
    this.projectForm.controls['EventDescription'].setValue(this.event.eventDescription);
    this.projectForm.controls['Destination'].setValue(this.event.destination);
    this.projectForm.controls['EventType'].setValue(this.event.eventTypeId);
    this.projectForm.controls['StartDate'].setValue(this.event.startDate);
    this.projectForm.controls['EndDate'].setValue(this.event.endDate);
    this.projectForm.controls['ClosingDate'].setValue(this.event.closingDate);
    this.projectForm.controls['IsFamilyMembersAllowed'].setValue(this.event.isFamilyMembersAllowed);
    this.projectForm.controls['NumberOfTeams'].setValue(this.event.numberOfTeams);
    this.projectForm.controls['Venue'].setValue(this.event.venue);
    this.projectForm.controls['Liquor'].setValue(this.event.iquor);
    this.getAttribute();

  }
  
  public getproject(){
 this.repository.getData('event/getall/'+this.PrId)
    .subscribe(res => {
      this.event = res ;
      
      
      this.fillproject();
    },
    (error) => {
    //  this.handleErrors(error);n
    })
   
 
}


 getparamId(){
  this.route.paramMap.subscribe((params:ParamMap)=>{
    let id =params.get('id');
    this.PrId=id;
    console.log("id of the evenet = "+id)
   });


}

public updateAttribute(value){
  if (this.projectForm.valid) {
      
    let formdata = new FormData;
   formdata.append('Id',this.PrId);
   formdata.append('EventTitle',value.EventTitle);
   formdata.append('EventTypeId',value.EventType);   
   formdata.append('StartDate',value.StartDate);
   formdata.append('EventDescription',value.EventDescription); 
  formdata.append('EndDate',value.EndDate);
  formdata.append('ClosingDate',value.ClosingDate);
  formdata.append('NumberOfTeams',value.NumberOfTeams);
  formdata.append('Liquor',value.Liquor); 
 formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed);
 formdata.append('Venue',value.Venue);
 formdata.append('Destination',value.Destination);

 
   
        let apiUrl = 'event/updateevent';
    console.log("formdata"+formdata)
    console.log("description = "+value.EventDescription)
    
    this.repository.postFile(apiUrl, formdata)
      .subscribe(res =>  {
        this.Message="Project updated!";
        console.log("response = "+res)
        this.urlAddress = "events/selectattributesforupdate/"+this.PrId;
               this.router.navigate([this.urlAddress]);
            
          //this.router.navigate(['/profile/admin/project']);
     
        },
        (error => {
          this.Message="Failed,";
        })
      )
  
  }
}



public getAttribute(){
  let apiUrl = 'event/getatribute/'+this.PrId;
  console.log("inside get attribute")
  this.repository.getData(apiUrl)
    .subscribe(res => {
     this.attribute = res;
    console.log(res)
        console.log("this is edn date"+this.attribute.endDate)
        this.closingDate = this.attribute.closingDate;
        this.destination = this.attribute.destination;
        this.endDate = this.attribute.endDate;
        this.isFamilyMembersAllowed = this.attribute.isFamilyMembersAllowed;
        this.liquor = this.attribute.liquor;
        this.venue = this.attribute.venue;
        this.numberOfTeams = this.attribute.numberOfTeams;



      },
      (error => {
    
      })
    )
}

}


