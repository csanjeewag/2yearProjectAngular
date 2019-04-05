import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router} from '@angular/router';
import { Event} from './../_interfaces/event';

@Component({
  selector: 'app-event-home-page',
  templateUrl: './event-home-page.component.html',
  styleUrls: ['./event-home-page.component.css']
})
export class EventHomePageComponent implements OnInit {
  public urlAddress;
  public events:any;
  constructor(private repository :RepositoryService,private route:Router) { }

  ngOnInit() {
    this.getUpComingEvents()
   
  }
  
  
  public  getUpComingEvents(){
    this.repository.getData('event/v')
    .subscribe(res => {
      this.events = res ;
      

  },
    (error) => {
    
    })
   
  }

  register(pKeys){
  
   
    this.urlAddress = "events/viewEventPage/"+pKeys;
    this.route.navigate([this.urlAddress]);
    
    
  }


 


}
