import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute } from '@angular/router';
  import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';

  

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService,config: NgbModalConfig, private modalService: NgbModal) { }

  public projectForm: FormGroup;
  public FileImage:File;
  public ImageUrl:any;
    public Message:any;
    public eventtypes:any;
    public projectID:any;
    public PrId:any;
    public event:any;
    public attribute:any;
    public urlAddress:any;

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
    
  
  ngOnInit() {
    this.getEvents();
    this.getparamId();
    
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
        budgetedCost: new FormControl(''),
        actualCost: new FormControl(''),
        mainOrganiZer: new FormControl(''),
        summary: new FormControl(''),
       })
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
    this.projectForm.controls['EventType'].setValue(this.event.eventTypeId);
    this.projectForm.controls['StartDate'].setValue(this.event.StartDate);

    if(this.event.destination!=null)
    this.projectForm.controls['Destination'].setValue(this.event.destination);

    if(this.event.endDate!=null)
    this.projectForm.controls['EndDate'].setValue(this.event.endDate);

    if(this.event.closingDate!=null)
    this.projectForm.controls['ClosingDate'].setValue(this.event.closingDate);

    if(this.event.isFamilyMembersAllowed!=null)
    this.projectForm.controls['IsFamilyMembersAllowed'].setValue(this.event.isFamilyMembersAllowed);

    if(this.event.numberOfTeams!=null)
    this.projectForm.controls['NumberOfTeams'].setValue(this.event.numberOfTeams);

    if(this.event.venue===null ){
     
    }else{
      console.log("venue value = "+this.event.venue)
      this.projectForm.controls['Venue'].setValue(this.event.venue);
    }
    if(this.event.liquor!=null)
    this.projectForm.controls['Liquor'].setValue(this.event.liquor);

    if(this.event.budgetedCost!=null)
    this.projectForm.controls['budgetedCost'].setValue(this.event.budgetedCost);

    if(this.event.actualCost!=null)
    this.projectForm.controls['actualCost'].setValue(this.event.actualCost);

    if(this.event.mainOrganiZer!=null)
    this.projectForm.controls['mainOrganiZer'].setValue(this.event.mainOrganiZer);

    if(this.event.summary!=null)
    this.projectForm.controls['summary'].setValue(this.event.summary);

    this.getAttribute();

  }
  
  public getproject(){
    console.log("inside get project");
     this.repository.getData('event/getall/'+this.PrId)
    .subscribe(res => {
      this.event = res ;
      console.log("event = "+this.event);
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
    this.getproject();
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
        console.log("response = "+res)
        
        this.urlAddress = "events/selectattributesforupdate/"+this.PrId;
              this.router.navigate([this.urlAddress]);
            
         
     
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
        this.budgetedCost = this.attribute.budgetedCost;
        this.actualCost = this.attribute.actualCost;
        this.mainOrganiZer = this.attribute.mainOrganiZer;
        this.summary = this.attribute.summary;


      },
      (error => {
    
      })
    )
}
public createAttribute(content){
window.alert("Event has been succesfully updated");}
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


