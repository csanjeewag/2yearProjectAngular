import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Event} from './../_interfaces/event';

@Component({
  selector: 'app-view-event-page',
  templateUrl: './view-event-page.component.html',
  styleUrls: ['./view-event-page.component.css']
})




export class ViewEventPageComponent implements OnInit {
   
  constructor(private repository :RepositoryService,private route:Router,private rou:ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { }
  public ImageUrl:any;
  public PrId:any;
  public event:any;
  public eventId:any;
  public date:any;
  public attribute:any;
  public form:any;
  public register:any;
  
  public urlAddress:any;

  public endDate:any;
  public closingDate:any;
  public destination:any;
  public liquor:any;
  public isFamilyMembersAllowed: any;
  public numberOfTeams: any;
 public venue: any;
  
  
  ngOnInit() {

    this.ImageUrl = this.repository.ImageUrl;

    this.endDate =false;
    this.closingDate=false;
    this.destination=false;
    this.liquor=false;
    this.isFamilyMembersAllowed=false;
    this.numberOfTeams=false;
    this.venue=false;
    this.register=false;

   this.getparamId();
   
  }
 
  
  
   public getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.PrId=id;
      console.log("id of the evenet = "+id)
      console.log("pridof the evenet = "+this.PrId)

      this.repository.currentEventId(id);
    
      this.getproject();
     });
  
  
  }


  public getproject(){
    console.log("pridof the evenet = "+this.PrId)
    let apiUrl = 'event/getall/'+this.PrId

    this.repository.getData(apiUrl)
       .subscribe(res => {
         this.event = res ;
        let today=new Date();
         if(new Date(today)<new Date(this.event.closingDate)){
           this.register='true';
         }
         this.getAttribute();
       },
       (error) => {
       
       })
      
   
   }

 getAttribute(){
  let apiUrl = 'event/getatribute/'+this.PrId;
  console.log("inside get attribute")

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

        this.getForm();

      },
      (error => {
    
      })
    )
 }
 


public deleteEmployee(content){
  this.modalService.open(content);
}

public updateEvent(){
  this.urlAddress = "events/updateevent/"+this.repository.curentEventId;
  console.log("url = "+this.urlAddress);
  this.route.navigate([this.urlAddress]);
}

public viewEmployee(){
  this.urlAddress = "events/viewEmployee/"+this.repository.curentEventId;
  this.route.navigate([this.urlAddress]);
  
}

public getForm(){
  let apiUrl = 'Registration/getRegistrationAttribute/'+this.repository.curentEventId;
  console.log("inside get form current event id = "+this.repository.curentEventId)

  console.log("inside get form")
  this.repository.getData(apiUrl)
    .subscribe(res => {
     this.form = res;
    console.log("form = "+res)
       
      },
      (error => {
    
      })
    )
}


 
}
