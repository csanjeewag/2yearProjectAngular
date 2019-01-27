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

  public PrId:any;
  public event:any;
  public eventId:any;
  public date:any;
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
    this.endDate =false;
    this.closingDate=false;
    this.destination=false;
    this.liquor=false;
    this.isFamilyMembersAllowed=false;
    this.numberOfTeams=false;
    this.venue=false;
   this.getparamId();
   
  }
 
  public getproject(){
    this.repository.curentEventId = this.PrId;
  
    this.repository.getData('event/getall/'+this.PrId)
       .subscribe(res => {
         this.event = res ;
         
         this.getAttribute();
       },
       (error) => {
       //  this.handleErrors(error);n
       })
      
   
   }
  
   public getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.PrId=id;
      console.log("id of the evenet = "+id)
      this.repository.currentEventId(this.PrId);
    
      this.getproject();
     });
  
  
  }

 getAttribute(){
  let apiUrl = 'event/getatribute/'+this.PrId;
  
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
 
}
