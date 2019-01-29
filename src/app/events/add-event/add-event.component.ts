
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
               console.log("event returned = "+this.event);
               console.log("updating the event befor go to select attribute");
              this.repository.addEventId(this.event.id);
            console.log("reading the event id from auth service  = "+this.repository.eventId)
               this.urlAddress = "events/selectattributes/"+this.repository.eventId;
               this.router.navigate([this.urlAddress]);
            
               },
               (error => {
                 this.Message="Failed,";
               })
             )
        
      }else{
        
        
        let formdata = new FormData;
        //formdata.append('EventId',value.EventId);
        formdata.append('EventTitle',value.EventTitle);
        formdata.append('EventTypeId',value.EventType);   
        formdata.append('StartDate',value.StartDate);
        formdata.append('EventDescription',value.EventDescription);
        formdata.append('EventImage', this.FileImage);

       //formdata.append('EndDate',value.EndDate);
      // formdata.append('ClosingDate',value.CDate);   
      
       // formdata.append('Destination',value.Destination); 
        //formdata.append('Venue',value.Venue); 
       // formdata.append('Liquor',value.Liquor); 
        //formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed); 
       // formdata.append('NumberOfTeams',value.IsFamilyMembersAllowed); 
        
         
          let apiUrl1 = 'Event/createevent';
          
          this.repository.postFile(apiUrl1, formdata)
            .subscribe(res =>  {
              this.Message="Event Created!";
              console.log(res)
              this.event=res;
              console.log("id of event = message id"+this.event.id);
            this.repository.addEventId(this.event.id);
            console.log("reading the event id from auth service  = "+this.repository.eventId)
              console.log(this.event.id);

              let atformdata = new FormData;
              atformdata.append('EventId',this.repository.eventId);
              let apiUrl = 'event/selectAttributes';
      
              this.repository.postFile(apiUrl, atformdata)
                .subscribe(res =>  {
                  //this.Message="attribute Created!";
                   //   this.router.navigate(['/profile/admin/roles']);
                   
               console.log("inside select attribute cfreation");
               this.urlAddress = "events/selectattributes/"+this.repository.eventId;
              this.router.navigate([this.urlAddress]);
                  },
                  (error => {
                    this.Message="Event Created Failed,Try Again!";
                    console.log("inside select attribute cfreation. errorrrrr");
                  })
                )



              
               
           
              },
              (error => {
                this.Message="Event Created Failed,Try Again!";
              })
            )
  

            



      }
      }

    }
  
    public createrole(value) {
    
    console.log(value) 
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
           console.log("formdata"+formdata)
           console.log("description = "+value.EventDescription)
           
           this.repository.postFile(apiUrl, formdata)
             .subscribe(res =>  {
               //this.Message="Project updated!";
               console.log("response = "+res)
               window.alert("Event has been succesfully Created")
               this.urlAddress = "profile/home";
  this.router.navigate([this.urlAddress]);
            
               },
               (error => {
                 this.Message="Failed,";
               })
             )
        }else{
      let formdata = new FormData;
      //formdata.append('EventId',value.EventId);
      formdata.append('EventTitle',value.EventTitle);
      formdata.append('EventTypeId',value.EventType);   
      formdata.append('StartDate',value.StartDate);
      formdata.append('EventDescription',value.EventDescription);
      formdata.append('EventImage', this.FileImage);

     //formdata.append('EndDate',value.EndDate);
    // formdata.append('ClosingDate',value.CDate);   
    
     // formdata.append('Destination',value.Destination); 
      //formdata.append('Venue',value.Venue); 
     // formdata.append('Liquor',value.Liquor); 
      //formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed); 
     // formdata.append('NumberOfTeams',value.IsFamilyMembersAllowed); 
      
       
        let apiUrl1 = 'Event/createevent';
        
        this.repository.postFile(apiUrl1, formdata)
          .subscribe(res =>  {
            window.alert("Event has been succesfully Created")
              
             
            console.log(res)
            this.event=res;
            console.log("id of event = message id"+this.event.id);
            this.repository.addEventId(this.event.id);
            console.log("reading the event id from auth service  = "+this.repository.eventId)
            let atformdata = new FormData;
            atformdata.append('EventId',this.repository.eventId);
            let apiUrl = 'event/selectAttributes';
    
            this.repository.postFile(apiUrl, atformdata)
              .subscribe(res =>  {
                //this.Message="attribute Created!";
                 //   this.router.navigate(['/profile/admin/roles']);
                 this.urlAddress = "profile/home";
                 this.router.navigate([this.urlAddress]);
                },
                (error => {
                  this.Message="Event Created Failed,Try Again!";
                })
              )



         
            },
            (error => {
              this.Message="Event Created Failed,Try Again!";
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
        
            console.log(res)
          },
          (error => {
        
          })
        )
    }

    public getAttribute(){
      let apiUrl = 'event/getatribute/'+this.eventId;
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
            this.budgetedCost = this.attribute.budgetedCost;
            this.actualCost = this.attribute.actualCost;
            console.log("this is actual cost"+this.attribute.actualCost)
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
        console.log("id of the evenet = "+id)
        console.log("get the  param id"+id)
        if(this.eventId!=null){
          this.getproject();
          this.fillproject();
          
          /*
          this.repository.getData('event/getatribute/'+this.eventId)
    .subscribe(res => {
      this.attribute = res ;
      
      
     
    },
    (error) => {
    //  this.handleErrors(error);n
    })*/

          }

       });
  }

 public fillproject(){
    this.EventForm.controls['EventTitle'].setValue(this.event.eventTitle);
    this.EventForm.controls['EventDescription'].setValue(this.event.eventDescription);
    this.EventForm.controls['Destination'].setValue(this.event.destination);
    this.EventForm.controls['EventType'].setValue(this.event.eventTypeId);
    this.EventForm.controls['StartDate'].setValue(this.event.startDate);
    this.EventForm.controls['EndDate'].setValue(this.event.endDate);
    this.EventForm.controls['ClosingDate'].setValue(this.event.closingDate);
    this.EventForm.controls['IsFamilyMembersAllowed'].setValue(this.event.isFamilyMembersAllowed);
    this.EventForm.controls['NumberOfTeams'].setValue(this.event.numberOfTeams);
    this.EventForm.controls['Venue'].setValue(this.event.venue);
    this.EventForm.controls['Liquor'].setValue(this.event.liquor);
    this.EventForm.controls['budgetedCost'].setValue(this.event.budgetedCost);
    this.EventForm.controls['actualCost'].setValue(this.event.actualCost);
    this.EventForm.controls['mainOrganiZer'].setValue(this.event.mainOrganiZer);
    this.EventForm.controls['summary'].setValue(this.event.summary);

    

    console.log("before get attribute")
    this.getAttribute();

  }
  
  public getproject(){
 this.repository.getData('event/getall/'+this.eventId)
    .subscribe(res => {
      this.event = res ;
      
      console.log("get projrct");
      this.fillproject();
      
    },
    (error) => {
    //  this.handleErrors(error);n
    })
}

onFileChange(file : FileList,id:number) {
    

  this.FileImage = file.item(0);
 //selected image viewing
  var reader = new FileReader();
  reader.onload = (event:any) => {
     this.ImageUrl = event.target.result;

     console.log(event.target.result)
  }
   reader.readAsDataURL(this.FileImage);
}




}