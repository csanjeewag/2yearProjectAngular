import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { Event} from './../_interfaces/event';
import { splitAtColon } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view-event-page',
  templateUrl: './view-event-page.component.html',
  styleUrls: ['./view-event-page.component.css']
})




export class ViewEventPageComponent implements OnInit {

  constructor(private repository :RepositoryService,private route:Router,private rou:ActivatedRoute) { }

  public event:any;
  public eventId;
  public destOrVen;
  public image = "https://res.cloudinary.com/if-only/image/upload/v1499961729/Hotels/SRI%2C%20Heritance%20Kandalama/Heritance-Kandalama_hero.jpg";
  public t;
  public date = new Date();
  ngOnInit() {
   
   
   
    this.eventId="28";
   
    this.getparamId();
    
    this.destOrVen = "Venue";
    this.eventId="1034";
    console.log("event id"+this.eventId);
      this.repository.getData('event/getall/'+this.eventId)
      .subscribe(res => {
        console.log("inside res"+res);
        this.event = res ;
       // var myObjStr = JSON.stringify(res);
       
       
       console.log(this.event.destination);
       console.log(this.event.startDate);
       var year = this.event.startDate.split('-')[0];
       var month = this.event.startDate.split('-')[1];
       var day = this.event.startDate.split('-')[2].split('T')[0];
       var date = `${year}-${month}-${day}`
       this.event.startDate=date;
       console.log("eeeeeeeeeeeeeeeeeevent type"+this.event.type);
      
      
       
      

       if (this.event.type === "BloodDonation"){
          this.image = "http://wall2born.com/data/out/333/image-46761152-wallpapers-hd-nature.jpg";
       }

          if (this.event.type === "OneDayTrip"){
           this.image = "https://res.cloudinary.com/if-only/image/upload/v1499961729/Hotels/SRI%2C%20Heritance%20Kandalama/Heritance-Kandalama_hero.jpg";
             }
      
          if (this.event.type === "TwoDayTrip"){
          this.image = "https://media.urbanistnetwork.com/saigoneer/article-images/legacy/Vm1pSRPb.jpg";
          }

       if (this.event.type === 'YearEndParty'){
          this.image = "https://media.urbanistnetwork.com/saigoneer/article-images/legacy/Vm1pSRPb.jpg";
       }
       //eventFormValue.startDate.split('-')[0]
      
      },
      (error) => {
      //  this.handleErrors(error);n
      })
   

     
    

  }
 

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      console.log(id);
      this.eventId=id;
     });

  }
 

 

 
}
