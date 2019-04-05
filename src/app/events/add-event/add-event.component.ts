
  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators} from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute  } from '@angular/router';
  import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { AuthServiceService } from "./../../AuthGards/auth-service.service";
  
  
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    constructor(private auth: AuthServiceService ,private router: Router,  private repository : RepositoryService,private route: ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
    }
   public IsAdmin:any;
   public IsRC:any;
    public FileImage:File;
    public ImageUrl:any;
    public EventForm: FormGroup;
    public Message:any;
    public eventtypes:any;
    public des:any;
    public urlAddress:any
    public event:any;
    public eventId:any;
    public attribute:any;
    public sdate:any;
    public edate:any;
    public cdate:any;



    

    public budgetedCost:any;
    public actualCost:any;
    public mainOrganiZer:any;
    public summary:any;
    public endDate:any;
    public closingDate:any;
    public destination:any;
    public liquor:any;
    public isFamilyMembersAllowed: any;
    public numberOfTeams: any;
   public venue: any;
   public modalRef: any;
 
    
    ngOnInit() {

      this.IsAdmin = this.auth.isAdmin();
      this.IsRC = this.auth.isRC();
      this.des=true;
      this.endDate =false;
      this.closingDate=false;
      this.destination=false;
      this.liquor=false;
      this.isFamilyMembersAllowed=false;
      this.numberOfTeams=false;
      this.venue=false;
      this.budgetedCost=false;
      this.actualCost=false;
      this.mainOrganiZer=false;
      this.summary=false;


      this.getEvents();
      this.getparamId();
      
      this.EventForm = new FormGroup({
       
       EventTitle: new FormControl('',[Validators.required]),
       EventType: new FormControl('',[Validators.required]),
       StartDate: new FormControl('',[Validators.required]),
       EventDescription: new FormControl('',[Validators.required]),

       EndDate: new FormControl(''),
       ClosingDate: new FormControl(''),       
        Destination: new FormControl(''),
        Venue: new FormControl(''),
        Liquor: new FormControl(''),
        IsFamilyMembersAllowed: new FormControl(''),
        NumberOfTeams: new FormControl(''),
        budgetedCost: new FormControl(''),
        actualCost: new FormControl(''),
        mainOrganiZer: new FormControl(''),
        summary: new FormControl(''),

        
     
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

    public updateEvent(value){
      if (this.EventForm.valid) {
        if(this.eventId!=null){

        
          let formdata = new FormData;
          formdata.append('Id',this.repository.eventId);
          formdata.append('EventTitle',value.EventTitle);
          formdata.append('EventTypeId',value.EventType);   
          formdata.append('StartDate',value.StartDate);
          formdata.append('EventImage', this.FileImage);
          formdata.append('EventDescription',value.EventDescription); 
         formdata.append('EndDate',value.EndDate);
         formdata.append('ClosingDate',value.ClosingDate);
         formdata.append('NumberOfTeams',value.NumberOfTeams);
         formdata.append('Liquor',value.Liquor); 
        formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed);
        formdata.append('Venue',value.Venue);
        formdata.append('Destination',value.Destination);
        formdata.append('BudgetedCost',value.budgetedCost); 
        formdata.append('ActualCost',value.actualCost);
        formdata.append('MainOrganiZer',value.mainOrganiZer);
        formdata.append('Summary',value.summary);
     
       
               let apiUrl = 'event/updateevent';
          
           this.repository.postFile(apiUrl, formdata)
             .subscribe(res =>  {
               this.event=res;
               this.urlAddress = "events/selectattributes/"+this.repository.eventId;
               this.router.navigate([this.urlAddress]);
            
               },
               (error => {
                 
               })
             )
        
      }else{
        
        
        let formdata = new FormData;
        
        formdata.append('EventTitle',value.EventTitle);
        formdata.append('EventTypeId',value.EventType);   
        formdata.append('StartDate',value.StartDate);
        formdata.append('EventDescription',value.EventDescription);
        formdata.append('EventImage', this.FileImage);

          let apiUrl1 = 'Event/createevent';
          
          this.repository.postFile(apiUrl1, formdata)
            .subscribe(res =>  {
             this.event=res;
              this.repository.addEventId(this.event.id);
          
              let atformdata = new FormData;
              atformdata.append('EventId',this.repository.eventId);
              let apiUrl = 'event/selectAttributes';
      
              this.repository.postFile(apiUrl, atformdata)
                .subscribe(res =>  {
                  this.urlAddress = "events/selectattributes/"+this.repository.eventId;
              this.router.navigate([this.urlAddress]);
                  },
                  (error => {
                   
                  })
                )



              
               
           
              },
              (error => {
               
              })
            )
  

            



      }
      }

    }
  
    public createrole(value) {
    
    
      if (this.EventForm.valid) {
        if(this.eventId!=null){
          let formdata = new FormData;
          formdata.append('Id',this.repository.eventId);
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
        formdata.append('BudgetedCost',value.budgetedCost); 
        formdata.append('ActualCost',value.actualCost);
        formdata.append('MainOrganiZer',value.mainOrganiZer);
        formdata.append('Summary',value.summary);
        formdata.append('EventImage', this.FileImage);
     
        
          
               let apiUrl = 'event/updateevent';
           
           this.repository.postFile(apiUrl, formdata)
             .subscribe(res =>  {
               
               this.repository.SuccessAlert('Event has been succesfully Created');
               this.urlAddress = "profile/home";
               this.router.navigate([this.urlAddress]);
            
               },
               (error => {
                 
               })
             )
        }else{
      let formdata = new FormData;
     
      formdata.append('EventTitle',value.EventTitle);
      formdata.append('EventTypeId',value.EventType);   
      formdata.append('StartDate',value.StartDate);
      formdata.append('EventDescription',value.EventDescription);
      formdata.append('EventImage', this.FileImage);

   
        let apiUrl1 = 'Event/createevent';
        
        this.repository.postFile(apiUrl1, formdata)
          .subscribe(res =>  {
           this.event=res;
            this.repository.addEventId(this.event.id);
            let atformdata = new FormData;
            atformdata.append('EventId',this.repository.eventId);
            let apiUrl = 'event/selectAttributes';
    
            this.repository.postFile(apiUrl, atformdata)
              .subscribe(res =>  {
                this.repository.SuccessAlert("Event has been succesfully Created");

               this.urlAddress = "profile/home";
                 this.router.navigate([this.urlAddress]);
                },
                (error => {
                 
                })
              )



         
            },
            (error => {
             
            })
          )


        }
      
      }



    }
  

    public getEvents(){
      let apiUrl = 'eventtype/getalleventtypes';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.eventtypes = res;
        
          },
          (error => {
        
          })
        )
    }

    public getAttribute(){
      let apiUrl = 'event/getatribute/'+this.eventId;
      this.repository.getData(apiUrl)
        .subscribe(res => {
            this.attribute = res;
            this.closingDate = this.attribute.closingDate;
            this.destination = this.attribute.destination;
            this.endDate = this.attribute.endDate;
            this.isFamilyMembersAllowed = this.attribute.isFamilyMembersAllowed;
            this.liquor = this.attribute.liquor;
            this.venue = this.attribute.venue;
            this.numberOfTeams = this.attribute.numberOfTeams;
            this.budgetedCost = this.attribute.budgetedCost;
            this.actualCost = this.attribute.actualCost;
            
            this.mainOrganiZer = this.attribute.mainOrganiZer;
            this.summary = this.attribute.summary;

            

          },
          (error => {
        
          })
        )
    }
    getparamId(){
      this.route.paramMap.subscribe((params:ParamMap)=>{
        let id =params.get('id');
        this.eventId=id;
        if(this.eventId!=null){
          this.getproject();
          this.fillproject();
          }

       });
  }

 public fillproject(){

  this.sdate=""+this.event.startDate;
  let x=this.sdate.split('T')
  this.sdate=x[0];
   
  this.edate=""+this.event.endDate;
  let y=this.edate.split('T')
    this.edate=y[0];
     
    this.cdate=""+this.event.closingDate;
    let z=this.cdate.split('T')
    this.cdate=z[0];
     

    this.EventForm.controls['EventTitle'].setValue(this.event.eventTitle);
    this.EventForm.controls['EventDescription'].setValue(this.event.eventDescription);
    if(this.event.destination!='null')
    this.EventForm.controls['Destination'].setValue(this.event.destination);

    this.EventForm.controls['EventType'].setValue(this.event.eventTypeId);
    this.EventForm.controls['StartDate'].setValue(this.sdate);

    if(this.edate!='0001-01-01')
    this.EventForm.controls['EndDate'].setValue(this.edate);

    if(this.cdate!='0001-01-01')
    this.EventForm.controls['ClosingDate'].setValue(this.cdate);

    if(this.event.isFamilyMembersAllowed!='null')
    this.EventForm.controls['IsFamilyMembersAllowed'].setValue(this.event.isFamilyMembersAllowed);

    if(this.event.numberOfTeams!='null')
    this.EventForm.controls['NumberOfTeams'].setValue(this.event.numberOfTeams);

    if(this.event.venue!='null')
    this.EventForm.controls['Venue'].setValue(this.event.venue);

    if(this.event.liquor!='null')
    this.EventForm.controls['Liquor'].setValue(this.event.liquor);

    if(this.event.budgetedCost!='0')
    this.EventForm.controls['budgetedCost'].setValue(this.event.budgetedCost);

    if(this.event.actualCost!='0')
    this.EventForm.controls['actualCost'].setValue(this.event.actualCost);

    if(this.event.mainOrganiZer!='0')
    this.EventForm.controls['mainOrganiZer'].setValue(this.event.mainOrganiZer);

    if(this.event.summary!='null')
    this.EventForm.controls['summary'].setValue(this.event.summary);

     this.getAttribute();

  }
  
  public getproject(){
 this.repository.getData('event/getall/'+this.eventId)
    .subscribe(res => {
      this.event = res ;
      
      this.fillproject();
      
    },
    (error) => {
    
    })
}

onFileChange(file : FileList,id:number) {
    

  this.FileImage = file.item(0);

  var reader = new FileReader();
  reader.onload = (event:any) => {
     this.ImageUrl = event.target.result;

   
  }
   reader.readAsDataURL(this.FileImage);
}

public AddEventType(){
  this.router.navigate(['events/addeventtype']);
}

public AddPoll(){
  this.router.navigate(['events/addPoll']);
}

}